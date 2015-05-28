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
            var movieTitled = new MovieDescribed(movieId, "Synopsis", "Critics Consensus", 2014);//, "R");

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
                    Year = 2014,
                    //MpaaRating = "R"
                }
            });
        }

        [Fact]
        public void The_MovieRatedByCritics_event_should_keep_a_roling_average()
        {
            var movieId = Guid.NewGuid();
            var ratedByCritics = new MovieRatedByCritics(movieId, 60);

            var repo = new DummyMovieProjectionRepository();
            repo.List[movieId] = new MovieProjection { Id = movieId, CriticsScore = 50};

            var handler = new MovieProjectionHandlers(repo);

            handler.Handle(ratedByCritics);

            repo.List.Count.Should().Be(1);
            repo.List.Values.ShouldBeEquivalentTo(new[]
            {
                new MovieProjection
                {
                    Id = movieId,
                    CriticsScore = 51
                }
            });
        }

        [Fact]
        public void The_MovieRatedByCritics_event_should_be_unchanged_with_the_same_rating()
        {
            var movieId = Guid.NewGuid();
            var ratedByCritics = new MovieRatedByCritics(movieId, 60);

            var repo = new DummyMovieProjectionRepository();
            repo.List[movieId] = new MovieProjection { Id = movieId, CriticsScore = 60 };

            var handler = new MovieProjectionHandlers(repo);

            handler.Handle(ratedByCritics);

            repo.List.Count.Should().Be(1);
            repo.List.Values.ShouldBeEquivalentTo(new[]
            {
                new MovieProjection
                {
                    Id = movieId,
                    CriticsScore = 60
                }
            });
        }

        [Fact]
        public void The_first_MovieRatedByCritics_event_should_set_the_rating()
        {
            var movieId = Guid.NewGuid();
            var ratedByCritics = new MovieRatedByCritics(movieId, 60);

            var repo = new DummyMovieProjectionRepository();
            repo.List[movieId] = new MovieProjection { Id = movieId };

            var handler = new MovieProjectionHandlers(repo);

            handler.Handle(ratedByCritics);

            repo.List.Count.Should().Be(1);
            repo.List.Values.ShouldBeEquivalentTo(new[]
            {
                new MovieProjection
                {
                    Id = movieId,
                    CriticsScore = 60
                }
            });
        }

        [Fact]
        public void The_MovieRatedByAudience_event_should_keep_a_roling_average()
        {
            var movieId = Guid.NewGuid();
            var ratedByCritics = new MovieRatedByAudience(movieId, 60);

            var repo = new DummyMovieProjectionRepository();
            repo.List[movieId] = new MovieProjection { Id = movieId, AudienceScore = 50 };

            var handler = new MovieProjectionHandlers(repo);

            handler.Handle(ratedByCritics);

            repo.List.Count.Should().Be(1);
            repo.List.Values.ShouldBeEquivalentTo(new[]
            {
                new MovieProjection
                {
                    Id = movieId,
                    AudienceScore = 51
                }
            });
        }

        [Fact]
        public void The_MovieRatedByAudience_event_should_be_unchanged_with_the_same_rating()
        {
            var movieId = Guid.NewGuid();
            var ratedByCritics = new MovieRatedByAudience(movieId, 60);

            var repo = new DummyMovieProjectionRepository();
            repo.List[movieId] = new MovieProjection { Id = movieId, AudienceScore = 60 };

            var handler = new MovieProjectionHandlers(repo);

            handler.Handle(ratedByCritics);

            repo.List.Count.Should().Be(1);
            repo.List.Values.ShouldBeEquivalentTo(new[]
            {
                new MovieProjection
                {
                    Id = movieId,
                    AudienceScore = 60
                }
            });
        }

        [Fact]
        public void The_first_MovieRatedByAudience_event_should_set_the_rating()
        {
            var movieId = Guid.NewGuid();
            var ratedByCritics = new MovieRatedByAudience(movieId, 60);

            var repo = new DummyMovieProjectionRepository();
            repo.List[movieId] = new MovieProjection { Id = movieId };

            var handler = new MovieProjectionHandlers(repo);

            handler.Handle(ratedByCritics);

            repo.List.Count.Should().Be(1);
            repo.List.Values.ShouldBeEquivalentTo(new[]
            {
                new MovieProjection
                {
                    Id = movieId,
                    AudienceScore = 60
                }
            });
        }

    }
}