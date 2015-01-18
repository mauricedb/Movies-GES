using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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

        public Task<T> GetById(Guid id)
        {
            var result = default(T);

            Items.TryGetValue(id, out result);

            return Task.FromResult(result);
        }

        public Task Save(T movie, Guid commitId)
        {
            Items[movie.Id] = movie;

            return Task.FromResult(0);
        }
    }
}