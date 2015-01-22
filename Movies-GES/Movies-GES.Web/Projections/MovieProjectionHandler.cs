using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Movies_GES.Domain.Domain;
using Movies_GES.Web.Models;
using ServiceStack.Redis;
using ServiceStack.Redis.Generic;

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

        public Task Handle(MovieDescribed movieDescribed)
        {
            UpdateMovie(movieDescribed.MovieId, m =>
            {
                m.Synopsis = movieDescribed.Synopsis;
                m.CriticsConsensus = movieDescribed.CriticsConsensus;
                m.Year = movieDescribed.Year;
            });

            return Task.FromResult(0);
        }

        private void UpdateMovie(object id, Action<MovieProjection> action)
        {
            using (var client = _clientsManager.GetClient())
            {
                var typedClient = client.As<MovieProjection>();
                var movie = typedClient.GetById(id);

                action(movie);

                typedClient.Store(movie);
            }
        }
    }
}