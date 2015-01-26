using System;
using FluentAssertions;
using Movies_GES.Domain.Domain;
using Movies_GES.Domain.Tests.Infrastructure;
using Movies_GES.Web.Models;
using Movies_GES.Web.Projections;
using Xunit;

namespace Movies_GES.Domain.Tests.Projections
{
    public class MovieProjectionHandlersSpecs
    {
        [Fact]
        public void The_MovieTitled_event_should_create_a_movie()
        {
            var movieId = Guid.NewGuid();
            var title = "Some movie";
            var movieTitled = new MovieTitled(movieId, title);

            var repo = new DummyMovieProjectionRepository();
            var handler = new MovieProjectionHandlers(repo);

            handler.Handle(movieTitled);

            repo.List.Count.Should().Be(1);
            repo.List.Values.ShouldBeEquivalentTo(new[]
            {
                new MovieProjection
                {
                    Id = movieId,
                    Title = title
                }
            });
        }

        [Fact]
        public void The_MovieTitled_event_should_update_a_movie()
        {
            const string title = "Some movie";
            var movieId = Guid.NewGuid();
            var movieTitled = new MovieTitled(movieId, title);

            var repo = new DummyMovieProjectionRepository();
            repo.List[movieId] = new MovieProjection {Id = movieId};

            var handler = new MovieProjectionHandlers(repo);

            handler.Handle(movieTitled);

            repo.List.Count.Should().Be(1);
            repo.List.Values.ShouldBeEquivalentTo(new[]
            {
                new MovieProjection
                {
                    Id = movieId,
                    Title = title
                }
            });
        }

        [Fact]
        public void The_MovieDescribed_event_should_update_a_movie()
        {
            var movieId = Guid.NewGuid();
            var movieTitled = new MovieDescribed(movieId, "Synopsis", "Critics Consensus", 2014);

            var repo = new DummyMovieProjectionRepository();
            repo.List[movieId] = new MovieProjection { Id = movieId };

            var handler = new MovieProjectionHandlers(repo);

            handler.Handle(movieTitled);

            repo.List.Count.Should().Be(1);
            repo.List.Values.ShouldBeEquivalentTo(new[]
            {
                new MovieProjection
                {
                    Id = movieId,
                    Synopsis = "Synopsis",
                    CriticsConsensus = "Critics Consensus",
                    Year = 2014
                }
            });
        }
    }
}