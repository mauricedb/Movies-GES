using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Movies_GES.Web.Models;
using ServiceStack.Redis;

namespace Movies_GES.Web.Api
{
    public class MoviesController : ApiController
    {
        private readonly IRedisClientsManager _clientsManager;

        public MoviesController(IRedisClientsManager clientsManager)
        {
            _clientsManager = clientsManager;
        }

        public IEnumerable<MovieProjection> Get()
        {
            using (var client = _clientsManager.GetClient())
            {
                var typedClient = client.As<MovieProjection>();
                return typedClient
                    .GetAll()
                    .OrderBy(m => m.Title);
            }
        }

        public IHttpActionResult Get(Guid id)
        {
            using (var client = _clientsManager.GetClient())
            {
                var typedClient = client.As<MovieProjection>();
                var movie = typedClient.GetById(id);

                if (movie != null)
                {
                    return Ok(movie);
                }

                return NotFound();
            }
        }
    }
}