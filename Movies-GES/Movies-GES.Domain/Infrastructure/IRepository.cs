using System;

namespace Movies_GES.Domain.Infrastructure
{
    public interface IRepository<T>
    {
        T GetById(Guid id);
        void Save(T aggregate, Guid commitId);
    }
}
