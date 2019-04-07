using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.SignalR;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Infrastructure;
using System.Reflection;
using Autofac.Integration.WebApi;
using Core.Concrete;
using Core.Abstract;

namespace WebApp.IoC
{
    public static class AutofacConfiguration
    {
        public static IContainer Container { get; private set; }
        private static ContainerBuilder builder;

        static AutofacConfiguration()
        {
            builder = new ContainerBuilder();

            builder.RegisterControllers(typeof(MvcApplication).Assembly);
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            RegisterBindings();

            Container = builder.Build();
        }

        private static void RegisterBindings()
        {
            builder.Register(x => new TaskGuard()).As<ITaskGuard>().SingleInstance();
            builder.Register((context, parameters) => new TestResultRepository(new TestContext())).As<ITestResultRepository>();
            builder.RegisterType<Autofac.Integration.SignalR.AutofacDependencyResolver>().As<IDependencyResolver>()
                                                                                         .SingleInstance();
            builder.RegisterType<ConnectionManager>().As<IConnectionManager>()
                                                     .SingleInstance();

            builder.RegisterType<MainHub>().ExternallyOwned();
        }
    }
}