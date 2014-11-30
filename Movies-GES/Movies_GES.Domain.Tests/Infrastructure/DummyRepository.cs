using System;
using System.Collections.Generic;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Domain.Tests.Infrastructure
{
    internal class DummyRepository<T> : IRepository<T>
    {
        public DummyRepository()
        {
            Items = new List<T>();
        }

        public List<T> Items { get; private set; }

        public T GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Save(T movie, Guid commitId)
        {
            Items.Add(movie);
        }
    }
}