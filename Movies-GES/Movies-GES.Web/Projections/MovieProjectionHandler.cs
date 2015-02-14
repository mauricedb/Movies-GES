using System;
using System.Collections.Generic;
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

        public void Handle(MovieRatedByAudience movieRated)
        {
            UpdateMovie(movieRated.MovieId,
                m =>
                {
                    if (m.AudienceScore.HasValue)
                    {
                        m.AudienceScore = (int)Math.Round(0.9 * m.AudienceScore.Value + 0.1 * movieRated.Rating, 0);
                    }
                    else
                    {
                        m.AudienceScore = movieRated.Rating;
                    }
                });
        }

        public void Handle(MovieRatedByCritics movieRated)
        {
            UpdateMovie(movieRated.MovieId,
                m =>
                {
                    if (m.CriticsScore.HasValue)
                    {
                        m.CriticsScore = (int) Math.Round(0.9*m.CriticsScore.Value + 0.1*movieRated.Rating, 0);
                    }
                    else
                    {
                        m.CriticsScore = movieRated.Rating;
                    }
                });
        }

        public void Handle(MovieIsDirectedBy isDirectedBy)
        {
            UpdateMovie(isDirectedBy.MovieId,
                m =>
                {
                    if (m.AbridgedDirectors == null)
                    {
                        m.AbridgedDirectors=new List<string>();
                    }

                    m.AbridgedDirectors.Add(isDirectedBy.Director);
                });
        }

        private void UpdateMovie(object id, Action<MovieProjection> action)
        {
            var movie = _repository.GetById(id);

            action(movie);

            _repository.Store(movie);
        }
    }
}