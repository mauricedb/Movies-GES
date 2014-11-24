using Movies_GES.Domain.Base;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Domain;

namespace Movies_GES.Domain.Handlers
{
    public class MovieHandlers:
        IHandles<TitleMovie>
    {
        public void Handle(TitleMovie command)
        {
            var movie = new Movie(command.MovieId, command.Title);

        }
    }
}
