using System;
using FluentAssertions;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Handlers;
using Xunit;

namespace Movies_GES.Domain.Tests.Handlers
{
    public class DirectorHandlersSpecs
    {
        [Fact]
        public void Create_movie_on_TitleMovie_command()
        {
            var repository = new DummyDirectorRepository();
            var handler = new DirectorHandlers(repository);

            handler.Handle(new NameDirector()
            {
                DirectorId = Guid.NewGuid(),
                Name = "Some Guy"
            });

            repository.Directors.Count.Should().Be(1);
        }
    }
}