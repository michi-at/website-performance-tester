using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;
using Newtonsoft.Json;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
        private IConnectionManager manager;
        private IHubContext hubContext;

        public HomeController(IConnectionManager manager)
        {
            this.manager = manager;
            hubContext = this.manager.GetHubContext<MainHub>();
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(string uri)
        {
            var test = new {message = "test message"};
            hubContext.Clients.All.message(test);
            return Content(JsonConvert.SerializeObject(test), AppUtils.JsonContentType);
        }
    }
}