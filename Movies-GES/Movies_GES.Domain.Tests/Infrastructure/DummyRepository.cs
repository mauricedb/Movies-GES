using System;
using System.Collections.Generic;
using System.Linq;
using Movies_GES.Domain.Base;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Domain.Tests.Infrastructure
{
    internal class DummyRepository<T> : IRepository<T> where T : AggregateRoot
    {
        public DummyRepository()
        {
            Items = new Dictionary<Guid, T>();
        }

        public Dictionary<Guid, T> Items { get; private set; }

        public T GetById(Guid id)
        {
            return Items[id];
        }

        public void Save(T movie, Guid commitId)
        {
            Items[movie.Id] = movie;
        }
    }
}