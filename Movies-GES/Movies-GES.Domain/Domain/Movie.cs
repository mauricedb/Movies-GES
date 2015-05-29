using System;
using Movies_GES.Domain.Base;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Domain.Domain
{
    public class Movie : AggregateRoot
    {
        private Guid _id;

        public Movie(Guid id, string title)
        {
            Guard.Requires<ArgumentException>(id != Guid.Empty);
            Guard.Requires<ArgumentException>(!string.IsNullOrWhiteSpace(title), "Please enter a title");

            ApplyChanges(new MovieTitled(id, title));
        }

        protected Movie()
        {
        }

        public override Guid Id { get { return _id; } }

        public void Describe(string synopsis, string criticsConsensus, int year, string mpaaRating)
        {
            Guard.Requires<ArgumentException>(year <= DateTime.Now.Year, "The film can't be created in the future");

            ApplyChanges(new MovieDescribed(Id, synopsis, criticsConsensus, year, mpaaRating));
        }

        internal void Title(string title)
        {
            Guard.Requires<ArgumentException>(!string.IsNullOrWhiteSpace(title), "Please enter a title");

            ApplyChanges(new MovieTitled(_id, title));
        }

        internal void RateByAudience(int rating)
        {
            Guard.Requires<ArgumentException>(rating >= 0, "The rating must be zero or greater");
            Guard.Requires<ArgumentException>(rating <= 100, "The rating must be equaloor less than 100");

            ApplyChanges(new MovieRatedByAudience(_id, rating));
        }

        internal void RateByCritcis(int rating)
        {
            Guard.Requires<ArgumentException>(rating >= 0, "The rating must be zero or greater");
            Guard.Requires<ArgumentException>(rating <= 100, "The rating must be equaloor less than 100");

            ApplyChanges(new MovieRatedByCritics(_id, rating));
        }

        internal void DirectedBy(string director)
        {
            Guard.Requires<ArgumentException>(!string.IsNullOrEmpty(director), "The director must be provided");
 
            ApplyChanges(new DirectorAddedToMovie(_id, director));
        }

        public void Apply(MovieTitled movieTitled)
        {
            _id = movieTitled.MovieId;
        }
    }
}