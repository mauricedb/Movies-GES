using System;
using Movies_GES.Domain.Base;

namespace Movies_GES.Domain.Domain
{
    public class MovieDescribed : DomainEvent
    {
        protected bool Equals(MovieDescribed other)
        {
            return string.Equals(Synopsis, other.Synopsis) && string.Equals(CriticsConsensus, other.CriticsConsensus) && Year == other.Year;
        }

        public override int GetHashCode()
        {
            unchecked
            {
                var hashCode = (Synopsis != null ? Synopsis.GetHashCode() : 0);
                hashCode = (hashCode*397) ^ (CriticsConsensus != null ? CriticsConsensus.GetHashCode() : 0);
                hashCode = (hashCode*397) ^ Year;
                return hashCode;
            }
        }

        public Guid MovieId { get; private set; }
        public string Synopsis { get; private set; }
        public string CriticsConsensus { get; private set; }
        public int Year { get; private set; }
        public string MpaaRating { get; private set; }

        public MovieDescribed(Guid movieId, string synopsis, string criticsConsensus, int year, string mpaaRating)
        {
            MovieId = movieId;
            Synopsis = synopsis;
            CriticsConsensus = criticsConsensus;
            Year = year;
            MpaaRating = mpaaRating;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != GetType()) return false;
            return Equals((MovieDescribed) obj);
        }
    }
}
