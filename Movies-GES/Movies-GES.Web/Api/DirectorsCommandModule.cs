using Cedar.HttpCommandHandling;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Handlers;

namespace Movies_GES.Web.Api
{
    public class DirectorsCommandModule : CommandHandlerModule
    {
        public DirectorsCommandModule(DirectorHandlers directorHandlers)
        {
            For<NameDirector>().Handle(async (message, _) => await directorHandlers.Handle(message.Command, message.CommandId));
        }
    }
}