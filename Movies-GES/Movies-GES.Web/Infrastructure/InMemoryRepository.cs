using System;
using System.Collections.Generic;
using Movies_GES.Domain.Base;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Web.Infrastructure
{
    public class InMemoryRepository<T> : IRepository<T> where T: AggregateRoot
    {
        private readonly Dictionary<Guid, T> _data = new Dictionary<Guid, T>();

        public T GetById(Guid id)
        {
            return _data[id];
        }

        public void Save(T aggregate, Guid commitId)
        {
            _data[aggregate.Id] = aggregate;
        }
    }
}