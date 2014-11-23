using System;

namespace Movies_GES.Domain.Domain
{
    public class Movie
    {
        private readonly Guid _id;
        private readonly string _title;

        public Movie(Guid id, string title)
        {
            _id = id;
            _title = title;
        }
    }
}