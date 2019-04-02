using System;
using System.Threading.Tasks;
using Autofac.Integration.SignalR;
using Autofac;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;
using WebApp.IoC;

[assembly: OwinStartup(typeof(WebApp.Startup))]

namespace WebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAutofac(app);

            var config = new HubConfiguration()
            {
                Resolver = AutofacConfiguration.Container.Resolve<IDependencyResolver>(),
            };
            ConfigureSignalR(app, config);
        }
    }
}
