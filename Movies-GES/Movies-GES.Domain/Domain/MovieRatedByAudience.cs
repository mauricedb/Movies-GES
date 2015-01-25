using System;
using Movies_GES.Domain.Base;

namespace Movies_GES.Domain.Domain
{
    public class MovieRatedByAudience : DomainEvent
    {
        public Guid MovieId { get; private set; }
        public int Rating { get; private set; }

        public MovieRatedByAudience(Guid movieId, int rating)
        {
            MovieId = movieId;
            Rating = rating;
        }

        protected bool Equals(MovieRatedByAudience other)
        {
            return MovieId.Equals(other.MovieId) && Rating == other.Rating;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((MovieRatedByAudience) obj);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return (MovieId.GetHashCode()*397) ^ Rating;
            }
        }

        public override string ToString()
        {
            return string.Format("MovieId: {0}, Rating: {1}", MovieId, Rating);
        }

    }
}