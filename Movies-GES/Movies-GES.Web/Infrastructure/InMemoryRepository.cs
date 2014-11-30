using System;
using System.Collections.Generic;
using Movies_GES.Domain.Base;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Web.Infrastructure
{
    public class InMemoryRepository<T> : IRepository<T> where T: AggregateRoot
    {
        private Dictionary<Guid, T> _movies = new Dictionary<Guid, T>();

        public T GetById(Guid id)
        {
            return _movies[id];
        }

        public void Save(T aggregate, Guid commitId)
        {
            _movies[aggregate.Id] = aggregate;
        }
    }
}