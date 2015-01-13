using System.Diagnostics;
using System.Threading.Tasks;
using Movies_GES.Domain.Domain;
using Movies_GES.Web.Models;
using ServiceStack.Redis;

namespace Movies_GES.Web.Projections
{
    public class MovieProjectionHandlers
    {
        private readonly IRedisClientsManager _clientsManager;

        public MovieProjectionHandlers(IRedisClientsManager clientsManager)
        {
            _clientsManager = clientsManager;
        }

        public Task Handle(MovieTitled movieTitled)
        {
            Trace.TraceInformation(movieTitled.ToString());

            using (var client = _clientsManager.GetClient())
            {
                var typedClient = client.As<MovieProjection>();
                var movie = typedClient.GetById(movieTitled.MovieId)
                            ?? new MovieProjection
                            {
                                Id = movieTitled.MovieId
                            };

                movie.Title = movieTitled.Title;
                typedClient.Store(movie);
            }

            return Task.FromResult(0);
        }
    }
}