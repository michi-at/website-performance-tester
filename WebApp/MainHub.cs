using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace WebApp
{
    [HubName("MainHub")]
    public class MainHub : Hub
    {
        [HubMethodName("NewMessage")]
        public void NewMessage(dynamic message)
        {
            Clients.All.update(message);
        }
    }
}