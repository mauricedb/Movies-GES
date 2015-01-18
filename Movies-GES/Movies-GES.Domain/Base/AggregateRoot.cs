using System;
using System.Collections.Generic;
using ReflectionMagic;

namespace Movies_GES.Domain.Base
{
    public abstract class AggregateRoot
    {
        private readonly List<DomainEvent> _changes = new List<DomainEvent>();

        public abstract Guid Id { get;  }

        public IEnumerable<DomainEvent> GetUncommittedChanges()
        {
            return _changes;
        }

        public void MarkChangesAsCommitted()
        {
            _changes.Clear();
        }

        public void LoadsFromHistory(IEnumerable<DomainEvent> domainEvents)
        {
            foreach (var domainEvent in domainEvents)
            {
                ApplyChanges(domainEvent);
            }
            this.MarkChangesAsCommitted();
        } 

        protected void ApplyChanges(DomainEvent domainEvent)
        {
            var dhis = this.AsDynamic();
            dhis.Apply(domainEvent);

            _changes.Add(domainEvent);
        }

        public void Apply(DomainEvent movieDescribed)
        {

        }

    }
}