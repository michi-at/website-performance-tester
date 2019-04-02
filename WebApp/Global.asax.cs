using Autofac.Integration.Mvc;
using System.Web.Mvc;
using System.Web.Routing;
using WebApp.IoC;

namespace WebApp
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            DependencyResolver.SetResolver(new AutofacDependencyResolver(AutofacConfiguration.Container));
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
