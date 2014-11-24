using System;
using FluentAssertions;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Handlers;
using Xunit;

namespace Movies_GES.Domain.Tests.Handlers
{
    public class MovieHandlersSpecs
    {
        [Fact]
        public void Create_movie_on_TitleMovie_command()
        {
            var repository = new DummyMovieRepository();
            var handler = new MovieHandlers(repository);

            handler.Handle(new TitleMovie
            {
                MovieId = Guid.NewGuid(),
                Title = "Some movie"
            });

            repository.Movies.Count.Should().Be(1);
        }
    }
}
