using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Autofac.Integration.Mvc;
using Owin;
using WebApp.IoC;

namespace WebApp
{
    public partial class Startup
    {
        public void ConfigureAutofac(IAppBuilder app)
        {
            app.UseAutofacMiddleware(AutofacConfiguration.Container);
            app.UseAutofacMvc();
        }
    }
}