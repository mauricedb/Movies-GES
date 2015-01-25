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

        public async Task Handle(TitleMovie command, Guid commandId)
        {
            var movie = await _repository.GetById(command.MovieId);
            if (movie != null)
            {
                movie.Title(command.Title);
            }
            else
            {
                movie = new Movie(command.MovieId, command.Title);
            }

            await _repository.Save(movie, commandId);
        }

        public async Task Handle(DescribeMovie command, Guid commandId)
        {
            var movie = await _repository.GetById(command.MovieId);
            movie.Describe(command.Synopsis, command.CriticsConsensus, command.Year);
            await _repository.Save(movie, commandId);
        }
    }
}