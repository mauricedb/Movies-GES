using System;
using FluentAssertions;
using Movies_GES.Domain.Domain;
using Xunit;

namespace Movies_GES.Domain.Tests.Domain
{
    public class DirectorSpecs
    {
        [Fact]
        public void Can_create_a_new_director()
        {
            var movie = new Director(Guid.NewGuid(), "Some Guy");

            movie.Should().NotBeNull();
        }

        [Fact]
        public void Creating_a_new_director_should_raise_event()
        {
            var id = Guid.NewGuid();
            var movie = new Director(id, "Some Guy");

            var uncommittedChanges = movie.GetUncommittedChanges();
            uncommittedChanges.Should().BeEquivalentTo(new DirectorNamed(id, "Some Guy"));
        }
    }
}