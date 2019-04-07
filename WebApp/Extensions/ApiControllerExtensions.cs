using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApp.Extensions
{
    public static class ApiControllerExtensions
    {
        public static IHttpActionResult Status(this ApiController api, int code, string message)
        {
            return new System.Web.Http.Results.ResponseMessageResult(
                api.Request.CreateErrorResponse(
                    (HttpStatusCode)code,
                    new HttpError(message)
                )
            );
        }
    }
}