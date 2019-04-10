using Core;
using Core.Abstract;
using Core.Entities;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using WebApp.Extensions;
using WebApp.Models;
using Exception = System.Exception;

namespace WebApp.Controllers
{
    public class ResultsController : ApiController
    {
        private readonly IConnectionManager manager;
        private readonly IHubContext hubContext;
        private readonly ITestResultRepository repository;
        private readonly ITaskGuard taskGuard;
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
        public IHttpActionResult Get()
        {
            var results = repository.GetResults().Select(x => new TestResultDTO(x));
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
            Uri uri = null;
            try
            {
                uri = new Uri(value);
                IHttpActionResult response;

                var result = repository.GetResultWithDetails(uri.Authority);
                if (!taskGuard.AddTask(uri.Authority))
                {
                    return this.Status((int) HttpStatusCode.ServiceUnavailable,
                        "Server is busy");
                }

                if (result != null)
                {
                    response = Process(result);
                }
                else
                {
                    response = await Process(uri);
                }

                if (response is OkResult
                    || response is ResponseMessageResult responseMessage
                    && responseMessage.Response.StatusCode == HttpStatusCode.OK)
                {
                    return Json(repository.GetResults().Select(x => new TestResultDTO(x)));
                }
                else return response;
            }
            catch (Exception)
            {
                return this.Status(422, "Unprocessable Entity");
            }
            finally
            {
                if (uri != null)
                {
                    taskGuard.RemoveTask(uri.Authority);
                }
            }
        }

        private async Task<IHttpActionResult> Process(Uri uri)
        {
            try
            {
                await pt.Start(uri);
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
                hubContext.Clients.All.message(new TestResultDetailDTO(resultDetail));
            };
            pt.RepositoryUpdateRequested += (sender, args) =>
            {
                repository.Update(args.TestResult);
                repository.Save();
            };
            pt.RepositoryInsertRequested += (sender, args) =>
            {
                repository.Add(args.TestResult);
                repository.Save();
            };
            pt.RepositoryInsertDetailsRequested += (sender, args) =>
            {
                repository.AddRange(args.TestResult.TestResultDetails);
                repository.Save();
            };
        }

    }
}
