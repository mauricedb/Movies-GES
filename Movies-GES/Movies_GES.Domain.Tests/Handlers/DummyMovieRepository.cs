using System;
using System.Collections.Generic;
using Movies_GES.Domain.Domain;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Domain.Tests.Handlers
{
    internal class DummyMovieRepository : IRepository<Movie>
    {
        public DummyMovieRepository()
        {
            Movies = new List<Movie>();
        }

        public List<Movie> Movies { get; private set; }

        public Movie GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Save(Movie movie, Guid commitId)
        {
            Movies.Add(movie);
        }
    }
}