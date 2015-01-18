using System;
using System.Threading.Tasks;

namespace Movies_GES.Domain.Infrastructure
{
    public interface IRepository<T>
    {
        T GetById(Guid id);
        void Save(T aggregate, Guid commitId);
    }

    public static class Guard
    {
        public static void Requires<T>(bool condition, params object[] args) where T : Exception, new()
        {
            if (!condition)
            {
                throw (T)Activator.CreateInstance(typeof(T), args);
            }
        }
    }
}
