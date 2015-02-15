using System;
using Movies_GES.Domain.Base;

namespace Movies_GES.Domain.Domain
{
    public class DirectorAddedToMovie : DomainEvent
    {
        public DirectorAddedToMovie(Guid movieId, string director)
        {
            MovieId = movieId;
            Director = director;
        }

        public Guid MovieId { get; private set; }
        public string Director { get; private set; }

        protected bool Equals(DirectorAddedToMovie other)
        {
            return MovieId.Equals(other.MovieId) && string.Equals(Director, other.Director);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((DirectorAddedToMovie) obj);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return (MovieId.GetHashCode()*397) ^ (Director != null ? Director.GetHashCode() : 0);
            }
        }
    }
}