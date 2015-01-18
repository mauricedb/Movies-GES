using System;
using System.Threading.Tasks;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Domain;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Domain.Handlers
{
    public class MovieHandlers
    {
        private readonly IRepository<Movie> _repository;

        public MovieHandlers(IRepository<Movie> repository)
        {
            _repository = repository;
        }

        public Task Handle(TitleMovie command)
        {
            var movie = new Movie(command.MovieId, command.Title);
            return _repository.Save(movie, command.CommandId);
        }

        public Task Handle(DescribeMovie command)
        {
            var movie = _repository.GetById(command.MovieId);
            movie.Describe(command.Synopsis, command.CriticsConsensus, command.Year);
            return _repository.Save(movie, command.CommandId);
        }
    }
}