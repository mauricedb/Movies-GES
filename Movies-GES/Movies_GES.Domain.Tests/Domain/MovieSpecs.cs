using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

    }
}
