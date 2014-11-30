using System;
using Movies_GES.Domain.Base;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Domain;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Domain.Handlers
{
    public class MovieHandlers :
        IHandles<TitleMovie>
    {
        private readonly IRepository<Movie> _repository;

        public MovieHandlers(IRepository<Movie> repository)
        {
            _repository = repository;
        }

        public void Handle(TitleMovie command)
        {
            command.MovieId = Guid.NewGuid();
            command.Id = Guid.NewGuid();

            var movie = new Movie(command.MovieId, command.Title);
            _repository.Save(movie, command.Id);
        }
    }
}