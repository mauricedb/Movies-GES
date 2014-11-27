using System;
using System.Collections.Generic;
using Movies_GES.Domain.Domain;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Web.Infrastructure
{
    public class MemoryMovieRepository : IRepository<Movie>
    {
        private Dictionary<Guid, Movie> _movies = new Dictionary<Guid, Movie>();

        public Movie GetById(Guid id)
        {
            return _movies[id];
        }

        public void Save(Movie aggregate, Guid commitId)
        {
            _movies[aggregate.Id] = aggregate;
        }
    }
}