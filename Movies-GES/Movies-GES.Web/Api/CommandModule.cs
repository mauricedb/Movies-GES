using System.Diagnostics;
using Cedar.HttpCommandHandling;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Handlers;

namespace Movies_GES.Web.Api
{
    public class CommandModule : CommandHandlerModule
    {
        public CommandModule(MovieHandlers movieHandlers, DirectorHandlers directorHandlers)
        {
            For<TitleMovie>().Handle(async (message, _) =>
            {
                Debug.WriteLine(message.CommandId);
                Debug.WriteLine(message.Command.Title);

                await movieHandlers.Handle(message.Command);
            });

            For<NameDirector>().Handle(async (message, _) =>
            {
                await directorHandlers.Handle(message.Command);
            });
        }
    }
}