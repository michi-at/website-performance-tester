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

        private const string jsonContentType = "application/json";

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
            hubContext.Clients.All.update("test message");
            return Content(JsonConvert.SerializeObject(new { message = "test message" } ), jsonContentType);
        }
    }
}