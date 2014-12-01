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
            var repository = new DummyRepository<Movie>();
            var handler = new MovieHandlers(repository);

            Action action = () => handler.Handle(new TitleMovie()
            {
                MovieId = Guid.NewGuid()
            });

            action.ShouldThrow<ArgumentException>();
        }

        [Fact]
        public void Describing_an_exiting_movie_should_pass()
        {
            var movieId = Guid.NewGuid();
            var repository = new DummyRepository<Movie>();
            repository.Save(new Movie(movieId, "Some movie"), Guid.Empty);
            var handler = new MovieHandlers(repository);

            handler.Handle(new DescribeMovie
            {
                MovieId = movieId,
                Synopsis = "Synopsis",
                CriticsConsensus = "CriticsConsensus",
                Year = 2014
            });

            repository.Items.Count.Should().Be(1);
        }

        [Fact]
        public void Describing_an_exiting_movie_with_an_future_year_should_fail()
        {
            var movieId = Guid.NewGuid();
            var repository = new DummyRepository<Movie>();
            repository.Save(new Movie(movieId, "Some movie"), Guid.Empty);
            var handler = new MovieHandlers(repository);

            Action action = () => handler.Handle(new DescribeMovie
            {
                MovieId = movieId,
                Synopsis = "Synopsis",
                CriticsConsensus = "CriticsConsensus",
                Year = DateTime.Now.Year + 1
            });

            action.ShouldThrow<ArgumentException>();
        }
    }
}
