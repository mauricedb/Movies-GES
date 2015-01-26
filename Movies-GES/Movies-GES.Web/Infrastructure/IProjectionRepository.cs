namespace Movies_GES.Web.Infrastructure
{
    public interface IProjectionRepository<T>
    {
        T GetById(object key);
        void Store(T entity);
    }
}