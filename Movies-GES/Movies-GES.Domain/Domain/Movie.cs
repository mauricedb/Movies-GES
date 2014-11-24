using System;
using Movies_GES.Domain.Base;

namespace Movies_GES.Domain.Domain
{
    public class Movie : AggregateRoot
    {
        private readonly Guid _id;
        private readonly string _title;

        public Movie(Guid id, string title)
        {
            ApplyChanges(new MovieTitled(id, title));
        }
    }
}