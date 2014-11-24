using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movies_GES.Domain.Base
{
    public class AggregateRoot
    {
        private readonly List<DomainEvent> _changes = new List<DomainEvent>();

        public IEnumerable<DomainEvent> GetUncommittedChanges()
        {
            return _changes;
        }


        protected void ApplyChanges(DomainEvent domainEvent)
        {
            _changes.Add(domainEvent);
        }
    }
}
