using System;
using Movies_GES.Domain.Base;

namespace Movies_GES.Domain.Domain
{
    public class Movie : AggregateRoot
    {
        private Guid _id;
        private string _title;

        public Movie(Guid id, string title)
        {
            ApplyChanges(new MovieTitled(id, title));
        }

        public void Apply(MovieTitled movieTitled)
        {
            _id = movieTitled.MovieId;
            _title = movieTitled.Title;
        }
    }
}