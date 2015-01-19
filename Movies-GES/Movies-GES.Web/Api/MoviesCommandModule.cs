using Cedar.HttpCommandHandling;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Handlers;

namespace Movies_GES.Web.Api
{
    public class MoviesCommandModule : CommandHandlerModule
    {
        public MoviesCommandModule(MovieHandlers movieHandlers)
        {
            For<TitleMovie>().Handle(async (message, _) => await movieHandlers.Handle(message.Command));

        }
    }
}