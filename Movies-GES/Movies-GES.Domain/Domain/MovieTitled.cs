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
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != GetType()) return false;
            return Equals((MovieTitled)obj);
        }

        protected bool Equals(MovieTitled other)
        {
            return MovieId.Equals(other.MovieId) && string.Equals(Title, other.Title);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return (MovieId.GetHashCode()*397) ^ (Title != null ? Title.GetHashCode() : 0);
            }
        }

        public override string ToString()
        {
            return string.Format("MovieTitled: {0} - {1}", MovieId,  Title);
        }
    }
}