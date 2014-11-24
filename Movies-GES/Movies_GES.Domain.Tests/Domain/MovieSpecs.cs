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
    }
}