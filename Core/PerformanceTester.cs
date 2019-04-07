using Abot.Core;
using Abot.Crawler;
using Abot.Poco;
using Core.Entities;
using Core.Extensions;
using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace Core
{
    public class PerformanceTester
    {
        public event EventHandler<PageTestingCompletedArgs> PageTestingCompleted;

        private TestResult result;
        private ConcurrentBag<TestResultDetail> resultDetails;

        #region Settings

        public int MaxPagesToCrawl { get; set; } = 50;
        public int MaxCrawlDepth { get; set; } = 2;
        public bool IsExternalPageCrawlingEnabled { get; set; } = false;
        public bool IsExternalPageLinksCrawlingEnabled { get; set; } = false;
        public int NumberOfRecurrentRequests { get; set; } = 3;
        public int MaxConcurrentThreads { get; set; } = 4;

        #endregion

        private int numberOfPagesCrawled = 0;
        private double rootMeanResponseTime = 0;
        private long rootMinResponseTime = long.MaxValue;
        private long rootMaxResponseTime = long.MinValue;
        private ConcurrentDictionary<string, byte> processedPages;
        private object mainLock = new object();

        public async Task<TestResult> Start(Uri targetUri, int id = 0)
        {
            if (!(await IsRemoteServerAlive(targetUri)))
            {
                throw new WebException("No response from server");
            }

            resultDetails = new ConcurrentBag<TestResultDetail>();
            processedPages = new ConcurrentDictionary<string, byte>();
            result = new TestResult()
            {
                Id = id,
                Authority = targetUri.Authority,
                TestDate = DateTime.Now,
            };

            CrawlConfiguration configuration = new CrawlConfiguration()
            {
                MaxPagesToCrawl = MaxPagesToCrawl,
                MaxCrawlDepth = MaxCrawlDepth,
                IsExternalPageCrawlingEnabled = IsExternalPageCrawlingEnabled,
                IsExternalPageLinksCrawlingEnabled = IsExternalPageLinksCrawlingEnabled,
                NumberOfRecurrentRequests = NumberOfRecurrentRequests,
                MaxConcurrentThreads = MaxConcurrentThreads
            };

            PoliteWebCrawler crawler = new PoliteWebCrawler(configuration, crawlDecisionMaker: null, memoryManager: null, scheduler: null,
                                                            hyperLinkParser: null, domainRateLimiter: null, robotsDotTextFinder: null,
                                                            threadManager: null, pageRequester: new PageRequesterWithRepeats(configuration));

            crawler.PageRequestSent += Crawler_PageRequestSent;
            crawler.PageResponseReceived += Crawler_PageResponseReceived;
            crawler.PageCrawlCompleted += Crawler_ProcessPageCrawlCompleted;

            crawler.ShouldCrawlPage((pageToCrawl, crawlContext) =>
            {
                CrawlDecision decision = new CrawlDecision { Allow = true };
                MatchCollection mc = Regex.Matches((pageToCrawl.Uri.AbsoluteUri), @"http[s]?:\/\/");
                if (mc.Count > 1)
                    return new CrawlDecision { Allow = false, Reason = "Dont want to crawl external pages" };

                return decision;
            });

            crawler.Crawl(targetUri);

            result.TestResultDetails = resultDetails.ToList();
            result.MinResponseTime = rootMinResponseTime;
            result.MaxResponseTime = rootMaxResponseTime;
            result.MeanResponseTime = rootMeanResponseTime / numberOfPagesCrawled;

            return result;
        }

        private async Task<bool> IsRemoteServerAlive(Uri uri)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var response = await client.GetAsync(uri);
                }
                catch (Exception)
                {
                    return false;
                }
            }

            return true;
        }

        public void Start(TestResult root)
        {
            root.TestDate = DateTime.Now;

            using (HttpClient client = new HttpClient())
            {
                var testBlock = new ActionBlock<TestResultDetail>(async item =>
                {
                    Stopwatch timer = new Stopwatch();
                    double mean = 0;

                    for (int i = 1; i <= NumberOfRecurrentRequests; ++i)
                    {
                        timer.Start();
                        await client.GetAsync(item.Uri);
                        timer.Stop();
                        long responseTime = timer.ElapsedMilliseconds;
                        timer.Reset();

                        if (i == 1)
                        {
                            ProcessFirstItem(item, responseTime);
                        }
                        else
                        {
                            ProcessItem(item, responseTime);
                        }
                        mean += responseTime / NumberOfRecurrentRequests;
                    }

                    item.MeanResponseTime = mean;
                    PageTestingCompleted?.Invoke(this, new PageTestingCompletedArgs(item));
                    lock (mainLock)
                    {
                        rootMeanResponseTime += item.MeanResponseTime;
                        if (item.MinResponseTime < rootMinResponseTime) rootMinResponseTime = item.MinResponseTime;
                        if (item.MaxResponseTime > rootMaxResponseTime) rootMaxResponseTime = item.MaxResponseTime;
                    }
                },
                new ExecutionDataflowBlockOptions()
                {
                    MaxDegreeOfParallelism = MaxConcurrentThreads
                });

                foreach (var item in root.TestResultDetails)
                {
                    testBlock.Post(item);
                }

                testBlock.Complete();
                testBlock.Completion.Wait();
            }

            root.MinResponseTime = rootMinResponseTime;
            root.MaxResponseTime = rootMaxResponseTime;
            root.MeanResponseTime = rootMeanResponseTime / root.TestResultDetails.Count;
        }

        private void ProcessItem(TestResultDetail item, long responseTime)
        {
            if (responseTime < item.MinResponseTime) item.MinResponseTime = responseTime;
            if (responseTime > item.MaxResponseTime) item.MaxResponseTime = responseTime;
        }

        private void ProcessFirstItem(TestResultDetail item, long responseTime)
        {
            item.MinResponseTime = item.MaxResponseTime = item.ResponseTime = responseTime;
        }

        private void Crawler_PageRequestSent(object sender, PageRequestSentArgs e)
        {
            Stopwatch timer = null;
            ExpandoObject pageBag = e.CrawledPage.PageBag;

            if (pageBag.HasProperty("Timer"))
            {
                e.CrawledPage.PageBag.IsFirst = false;
                timer = e.CrawledPage.PageBag.Timer;
            }
            else
            {
                e.CrawledPage.PageBag.IsFirst = true;
                timer = new Stopwatch();
                e.CrawledPage.PageBag.Timer = timer;
                e.CrawledPage.PageBag.Item = new TestResultDetail()
                {
                    TestResult = result
                };
                e.CrawledPage.PageBag.Mean = 0d;
            }

            timer.Start();
        }

        private void Crawler_PageResponseReceived(object sender, PageResponseReceivedArgs e)
        {
            Stopwatch timer = e.CrawledPage.PageBag.Timer;
            timer.Stop();
            long responseTime = timer.ElapsedMilliseconds;
            timer.Reset();

            var response = e.HttpWebResponse;

            TestResultDetail item = e.CrawledPage.PageBag.Item;
            double mean = e.CrawledPage.PageBag.Mean;

            if (e.CrawledPage.PageBag.IsFirst)
            {
                item.Uri = response.ResponseUri.AbsoluteUri;
                ProcessFirstItem(item, responseTime);
            }
            else
            {
                ProcessItem(item, responseTime);
            }
            mean += responseTime / NumberOfRecurrentRequests;

            e.CrawledPage.PageBag.Mean = item.MeanResponseTime = mean;
        }

        private void Crawler_ProcessPageCrawlCompleted(object sender, PageCrawlCompletedArgs e)
        {
            PageToCrawl pageToCrawl = e.CrawledPage;
            TestResultDetail item = e.CrawledPage.PageBag.Item;
            lock (mainLock)
            {
                rootMeanResponseTime += item.MeanResponseTime;
                if (item.MinResponseTime < rootMinResponseTime) rootMinResponseTime = item.MinResponseTime;
                if (item.MaxResponseTime > rootMaxResponseTime) rootMaxResponseTime = item.MaxResponseTime;
                ++numberOfPagesCrawled;
            }
            if (!processedPages.ContainsKey(item.Uri))
            {
                resultDetails.Add(item);
                processedPages.TryAdd(item.Uri, 0);
                PageTestingCompleted?.Invoke(this, new PageTestingCompletedArgs(item));
            }
        }
    }
}
