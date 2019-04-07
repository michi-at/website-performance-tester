using Core;
using Core.Abstract;
using Core.Entities;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Infrastructure;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using WebApp.Extensions;
using Exception = System.Exception;

namespace WebApp.Controllers
{
    public class ResultsController : ApiController
    {
        private IConnectionManager manager;
        private IHubContext hubContext;
        private ITestResultRepository repository;
        private ITaskGuard taskGuard;
        private PerformanceTester pt;

        public ResultsController(IConnectionManager manager, ITestResultRepository rep, ITaskGuard guard)
        {
            this.manager = manager;
            hubContext = this.manager.GetHubContext<MainHub>();
            repository = rep;
            taskGuard = guard;
            InitTester();
        }

        // GET: api/Results
        public JsonResult<IList<TestResult>> Get()
        {
            var results = repository.GetResults();
            return Json(results);
        }

        // GET: api/Results/5
        public IHttpActionResult Get(int id)
        {
            var result = repository.GetResult(id);
            if (result == null)
            {
                return NotFound();
            }
            return Json(result);
        }

        // GET: api/Results?authority=string
        public IHttpActionResult Get(string authority)
        {
            var result = repository.GetResult(authority);
            if (result == null)
            {
                return NotFound();
            }
            return Json(result);
        }

        // POST: api/Results
        public async Task<IHttpActionResult> Post([FromBody]string value)
        {
            try
            {
                Uri uri = new Uri(value);
                IHttpActionResult response;

                var result = repository.GetResultWithDetails(uri.Authority);
                if (!taskGuard.AddTask(uri.Authority))
                {
                    return this.Status((int)HttpStatusCode.ServiceUnavailable,
                        "Specified target is currently being processed");
                }

                if (result != null)
                {
                    response = Process(result);
                }
                else
                {
                    response = await Process(uri);
                }

                taskGuard.RemoveTask(uri.Authority);

                return response;
            }
            catch (Exception)
            {
                return this.Status(422, "Unprocessable Entity");
            }
        }

        private async Task<IHttpActionResult> Process(Uri uri)
        {
            try
            {
                var result = await pt.Start(uri);
                repository.Add(result);
                await repository.SaveAsync();
            }
            catch (WebException ex)
            {
                return this.Status((int)HttpStatusCode.ServiceUnavailable, ex.Message);
            }

            return Ok();
        }

        private IHttpActionResult Process(TestResult result)
        {
            try
            {
                pt.Start(result);
                repository.Update(result);
                repository.Save();
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.InternalServerError);
            }

            return Ok();
        }

        private void InitTester()
        {
            pt = new PerformanceTester();
            pt.PageTestingCompleted += (sender, args) =>
            {
                var resultDetail = args.ResultDetail;
                TestResultDetail detailWithoutSelfLoop = new TestResultDetail()
                {
                    Id = resultDetail.Id,
                    Uri = resultDetail.Uri,
                    ResponseTime = resultDetail.ResponseTime,
                    MinResponseTime = resultDetail.MinResponseTime,
                    MaxResponseTime = resultDetail.MaxResponseTime,
                    MeanResponseTime = resultDetail.MeanResponseTime,
                    TestResult = null
                };
                hubContext.Clients.All.message(detailWithoutSelfLoop);
            };
        }

    }
}
