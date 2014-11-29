using System;
using Movies_GES.Domain.Base;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Domain.Domain
{
    public class Movie : AggregateRoot
    {
        private Guid _id;
        private string _title;

        public Movie(Guid id, string title)
        {
            Guard.Requires<ArgumentException>(id != Guid.Empty);
            Guard.Requires<ArgumentException>(!string.IsNullOrWhiteSpace(title),"Please enter a title");

            ApplyChanges(new MovieTitled(id, title));
        }

        public Guid Id { get { return _id; } }

        public void Apply(MovieTitled movieTitled)
        {
            _id = movieTitled.MovieId;
            _title = movieTitled.Title;
        }
    }
}