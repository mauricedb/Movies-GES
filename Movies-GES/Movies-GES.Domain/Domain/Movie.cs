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

        public void Describe(string synopsis, string criticsConsensus, int year)
        {
            Guard.Requires<ArgumentException>(year <= DateTime.Now.Year, "The film can't be created in the future");

            ApplyChanges(new MovieDescribed(synopsis, criticsConsensus, year));
        }

        internal void Title(string title)
        {
            ApplyChanges(new MovieTitled(_id, title));
        }

        public void Apply(MovieTitled movieTitled)
        {
            _id = movieTitled.MovieId;
        }
    }
}