using System;
using Movies_GES.Domain.Base;

namespace Movies_GES.Domain.Domain
{
    public class DirectorNamed : DomainEvent
    {
        public Guid DirectorId { get; private set; }
        public string Name { get; private set; }

        public DirectorNamed(Guid directorId, string name)
        {
            DirectorId = directorId;
            Name = name;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((DirectorNamed) obj);
        }

        protected bool Equals(DirectorNamed other)
        {
            return DirectorId.Equals(other.DirectorId) && string.Equals(Name, other.Name);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return (DirectorId.GetHashCode() * 397) ^ (Name != null ? Name.GetHashCode() : 0);
            }
        }
    }
}