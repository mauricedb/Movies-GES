using System;
using Movies_GES.Domain.Base;

namespace Movies_GES.Domain.Domain
{
    public class MovieTitled : DomainEvent
    {
        public Guid MovieId { get; private set; }
        public string Title { get; private set; }

        public MovieTitled(Guid movieId, string title)
        {
            MovieId = movieId;
            Title = title;
        }

        public override bool Equals(object obj)
        {
            var that = obj as MovieTitled;
            if (that != null && that.MovieId == MovieId && that.Title == Title)
            {
                return true;
            }
            return false;
        }        
    }
}