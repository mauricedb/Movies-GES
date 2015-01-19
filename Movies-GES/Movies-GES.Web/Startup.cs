using Cedar.HttpCommandHandling;
using Microsoft.Owin;
using Movies_GES.Web.Api;
using Owin;
using TinyIoC;

[assembly: OwinStartup(typeof(Movies_GES.Web.Startup))]

namespace Movies_GES.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.Map("/api/commands", builder =>
            {
                var moviesCommandModule = TinyIoCContainer.Current.Resolve<MoviesCommandModule>();
                var directorsCommandModule = TinyIoCContainer.Current.Resolve<DirectorsCommandModule>();
                var resolver = new CommandHandlerResolver(moviesCommandModule, directorsCommandModule);
                var settings = new CommandHandlingSettings(resolver);

                var commandHandlingMiddleware = CommandHandlingMiddleware.HandleCommands(settings);
                builder.Use(commandHandlingMiddleware);
            });
        }
    }

}
