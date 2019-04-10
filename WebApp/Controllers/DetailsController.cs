using Core.Abstract;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class DetailsController : ApiController
    {
        private readonly IConnectionManager manager;
        private readonly IHubContext hubContext;
        private readonly ITestResultRepository repository;

        public DetailsController(IConnectionManager manager, ITestResultRepository rep)
        {
            this.manager = manager;
            hubContext = this.manager.GetHubContext<MainHub>();
            repository = rep;
        }

        // GET: api/results/{id}/details
        public IHttpActionResult Get(int id)
        {
            var details = repository.GetResultDetails(id).Select(x => new TestResultDetailDTO(x));
            if (details == null)
            {
                return NotFound();
            }
            return Json(details);
        }

        // GET: api/results/{id}/details/{param}
        public IHttpActionResult Get(int id, int param)
        {
            var detail = repository.GetResultDetail(id, param);
            if (detail == null)
            {
                return NotFound();
            }
            return Json(new TestResultDetailDTO(detail));
        }
    }
}
