using System;
using Movies_GES.Domain.Domain;
using Movies_GES.Web.Infrastructure;
using Movies_GES.Web.Models;

namespace Movies_GES.Web.Projections
{
    public class MovieProjectionHandlers
    {
        private readonly IProjectionRepository<MovieProjection> _repository;

        public MovieProjectionHandlers(IProjectionRepository<MovieProjection> repository)
        {
            _repository = repository;
        }

        public void Handle(MovieTitled movieTitled)
        {
            var movie = _repository.GetById(movieTitled.MovieId)
                        ?? new MovieProjection
                        {
                            Id = movieTitled.MovieId
                        };

            movie.Title = movieTitled.Title;
            _repository.Store(movie);
        }

        public void Handle(MovieDescribed movieDescribed)
        {
            UpdateMovie(movieDescribed.MovieId, m =>
            {
                m.Synopsis = movieDescribed.Synopsis;
                m.CriticsConsensus = movieDescribed.CriticsConsensus;
                m.Year = movieDescribed.Year;
            });
        }

        public void Handle(MovieRatedByAudience movieDescribed)
        {
            UpdateMovie(movieDescribed.MovieId,
                m => { m.AudienceScore = (int) Math.Round(0.9*m.AudienceScore + 0.1*movieDescribed.Rating, 0); });
        }

        public void Handle(MovieRatedByCritics movieDescribed)
        {
            UpdateMovie(movieDescribed.MovieId,
                m => { m.CriticsScore = (int) Math.Round(0.9*m.CriticsScore + 0.1*movieDescribed.Rating, 0); });
        }

        private void UpdateMovie(object id, Action<MovieProjection> action)
        {
            var movie = _repository.GetById(id);

            action(movie);

            _repository.Store(movie);
        }
    }
}