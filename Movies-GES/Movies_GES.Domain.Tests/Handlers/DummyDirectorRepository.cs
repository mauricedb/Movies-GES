using System;
using System.Collections.Generic;
using Movies_GES.Domain.Domain;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Domain.Tests.Handlers
{
    internal class DummyDirectorRepository : IRepository<Director>
    {
        public DummyDirectorRepository()
        {
            Directors = new List<Director>();
        }

        public List<Director> Directors { get; private set; }

        public Director GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Save(Director movie, Guid commitId)
        {
            Directors.Add(movie);
        }
    }
}