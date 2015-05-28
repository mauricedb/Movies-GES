using System;
using FluentAssertions;
using Movies_GES.Domain.Domain;
using Xunit;

namespace Movies_GES.Domain.Tests.Domain
{
    public class MovieSpecs
    {
        [Fact]
        public void Can_create_a_new_movie()
        {
            var movie = new Movie(Guid.NewGuid(), "Some movie");

            movie.Should().NotBeNull();
        }

        [Fact]
        public void Creating_a_new_movie_should_raise_event()
        {
            var id = Guid.NewGuid();
            var movie = new Movie(id, "Some movie");

            var uncommittedChanges = movie.GetUncommittedChanges();
            uncommittedChanges.Should().BeEquivalentTo(new MovieTitled(id, "Some movie"));
        }

        [Fact]
        public void Creating_a_new_movie_without_a_title_should_throw()
        {
            Action create = () =>
            {
                var id = Guid.NewGuid();
                new Movie(id, "");
            };

            create.ShouldThrow<ArgumentException>();
        }

        [Fact]
        public void Describing_an_existing_movie_should_raise_event()
        {
            var id = Guid.NewGuid();
            var movie = new Movie(id, "Some movie");
            movie.MarkChangesAsCommitted();

            movie.Describe("Synopsis", "Critics consensus", 2014);//, "R");

            var uncommittedChanges = movie.GetUncommittedChanges();
            uncommittedChanges.Should().BeEquivalentTo(new MovieDescribed(id, "Synopsis", "Critics consensus", 2014));//, "R"));
         }

        [Fact]
        public void Describing_a_movie_with_a_future_year_should_throw()
        {
            var id = Guid.NewGuid();
            var movie = new Movie(id, "Some movie");
            movie.MarkChangesAsCommitted();

            Action create = () => movie.Describe("Synopsis", "Critics consensus", DateTime.Now.Year + 1);//, null);

            create.ShouldThrow<ArgumentException>();
        }
    }
}