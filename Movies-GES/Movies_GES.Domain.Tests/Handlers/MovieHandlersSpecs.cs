﻿using System;
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
        public void Create_movie_on_TitleMovie_command()
        {
            var repository = new DummyRepository<Movie>();
            var handler = new MovieHandlers(repository);

            handler.Handle(new TitleMovie
            {
                MovieId = Guid.NewGuid(),
                Title = "Some movie"
            });

            repository.Items.Count.Should().Be(1);
        }

        [Fact]
        public void Create_movie_without_title_command_should_fail()
        {
            var repository = new DummyRepository<Director>();
            var handler = new DirectorHandlers(repository);

            Action action = () => handler.Handle(new NameDirector()
            {
                DirectorId = Guid.NewGuid(),
            });

            action.ShouldThrow<ArgumentException>();
        }

    }
}
