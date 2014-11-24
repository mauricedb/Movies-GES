using System;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Handlers;
using Xunit;

namespace Movies_GES.Domain.Tests.Handlers
{
    public class MovieHandlersSpecs
    {
        [Fact]
        public void Create_movie_on_TitleMovie_command()
        {
            var handler = new MovieHandlers();

            handler.Handle(new TitleMovie()
            {
                MovieId = Guid.NewGuid(),
                Title = "Some movie"
            });
        
        
        }
    }
}
