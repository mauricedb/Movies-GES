using Movies_GES.Web.Models;
using ServiceStack.Redis;

namespace Movies_GES.Web.Infrastructure
{
    internal class MovieProjectionRepository : IProjectionRepository<MovieProjection>
    {
        private readonly IRedisClientsManager _clientsManager;

        public MovieProjectionRepository(IRedisClientsManager clientsManager)
        {
            _clientsManager = clientsManager;
        }

        public MovieProjection GetById(object key)
        {
            using (var client = _clientsManager.GetClient())
            {
                var typedClient = client.As<MovieProjection>();
                return typedClient.GetById(key);
            }
        }

        public void Store(MovieProjection entity)
        {
            using (var client = _clientsManager.GetClient())
            {
                var typedClient = client.As<MovieProjection>();
                typedClient.Store(entity);
            }
        }
    }
}