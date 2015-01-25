using System;
using System.Threading.Tasks;
using FluentAssertions;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Domain;
using Movies_GES.Domain.Handlers;
using Movies_GES.Domain.Tests.Infrastructure;
using Xunit;

namespace Movies_GES.Domain.Tests.Handlers
{
    public class MovieHandlersSpecs
    {
        [Fact]
        public async Task Create_movie_on_TitleMovie_command()
        {
            var repository = new DummyRepository<Movie>();
            var handler = new MovieHandlers(repository);

            await handler.Handle(new TitleMovie
              {
                  MovieId = Guid.NewGuid(),
                  Title = "Some movie"
              }, Guid.NewGuid());

            repository.Items.Count.Should().Be(1);
        }

        [Fact]
        public void Create_movie_without_title_command_should_fail()
        {
            var repository = new DummyRepository<Movie>();
            var handler = new MovieHandlers(repository);

            handler.Awaiting(h => h.Handle(new TitleMovie
            {
                MovieId = Guid.NewGuid()
            }, Guid.NewGuid()))
            .ShouldThrow<ArgumentException>();
        }

        [Fact]
        public async Task Describing_an_exiting_movie_should_pass()
        {
            var movieId = Guid.NewGuid();
            var repository = new DummyRepository<Movie>();
            await repository.Save(new Movie(movieId, "Some movie"), Guid.Empty);
            var handler = new MovieHandlers(repository);

            await handler.Handle(new DescribeMovie
             {
                 MovieId = movieId,
                 Synopsis = "Synopsis",
                 CriticsConsensus = "CriticsConsensus",
                 Year = 2014
             }, Guid.NewGuid());

            repository.Items.Count.Should().Be(1);
        }

        [Fact]
        public async Task Describing_an_exiting_movie_with_an_future_year_should_fail()
        {
            var movieId = Guid.NewGuid();
            var repository = new DummyRepository<Movie>();
            await repository.Save(new Movie(movieId, "Some movie"), Guid.Empty);
            var handler = new MovieHandlers(repository);

            handler.Awaiting(h => h.Handle(new DescribeMovie
            {
                MovieId = movieId,
                Synopsis = "Synopsis",
                CriticsConsensus = "CriticsConsensus",
                Year = DateTime.Now.Year + 1
            }, Guid.NewGuid()))
            .ShouldThrow<ArgumentException>();
        }

        [Fact]
        public async Task Rating_movie_50_should_pass()
        {
            var movieId = Guid.NewGuid();
            var repository = new DummyRepository<Movie>();
            await repository.Save(new Movie(movieId, "Some movie"), Guid.Empty);
            var handler = new MovieHandlers(repository);

          handler.Awaiting(h => h.Handle(new RateMovieByAudience
            {
                MovieId = movieId,
                Rating = 50
            }, Guid.NewGuid())).ShouldNotThrow();
        }

        [Fact]
        public async Task Rating_movie_below_zero_should_fail()
        {
            var movieId = Guid.NewGuid();
            var repository = new DummyRepository<Movie>();
            await repository.Save(new Movie(movieId, "Some movie"), Guid.Empty);
            var handler = new MovieHandlers(repository);

            handler.Awaiting(h => h.Handle(new RateMovieByAudience
            {
                MovieId = movieId,
                Rating = -1
            }, Guid.NewGuid())).ShouldThrow<ArgumentException>();
        }

        [Fact]
        public async Task Rating_movie_above_100_should_fail()
        {
            var movieId = Guid.NewGuid();
            var repository = new DummyRepository<Movie>();
            await repository.Save(new Movie(movieId, "Some movie"), Guid.Empty);
            var handler = new MovieHandlers(repository);

            handler.Awaiting(h => h.Handle(new RateMovieByAudience
            {
                MovieId = movieId,
                Rating = 101
            }, Guid.NewGuid())).ShouldThrow<ArgumentException>();
        }
    }
}