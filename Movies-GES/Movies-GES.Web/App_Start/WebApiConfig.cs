using System.Web.Http;
using Movies_GES.Web.Infrastructure;
using TinyIoC;

namespace Movies_GES.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.DependencyResolver = new TinyIoCDependencyResolver(TinyIoCContainer.Current);

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
