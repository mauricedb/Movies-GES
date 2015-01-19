using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.ModelBinding.Binders;
using Cedar.HttpCommandHandling;
using Microsoft.Owin;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Handlers;
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
                var commandModule = TinyIoCContainer.Current.Resolve<CommandModule>();
                var resolver = new CommandHandlerResolver(commandModule);
                var settings = new CommandHandlingSettings(resolver);

                var commandHandlingMiddleware = CommandHandlingMiddleware.HandleCommands(settings);
                builder.Use(commandHandlingMiddleware);
            });
        }
    }

    public class CommandModule : CommandHandlerModule
    {

        public CommandModule(MovieHandlers movieHandlers)
        {

            For<TitleMovie>().Handle(async (message, _) =>
            {
                Debug.WriteLine(message.CommandId);
                Debug.WriteLine(message.Command.Title);

                await movieHandlers.Handle(message.Command);

            });
        }
    }
}
