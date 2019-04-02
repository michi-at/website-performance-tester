using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace WebApp
{
    public class MainHub : Hub
    {
        private IConnectionManager manager;
        private IHubContext context;

        public MainHub(IConnectionManager manager)
        {
            this.manager = manager;
            context = this.manager.GetHubContext<MainHub>();
        }

        [HubMethodName("NewMessage")]
        public void NewMessage(string message)
        {
            Clients.All.update(message);
        }
    }
}