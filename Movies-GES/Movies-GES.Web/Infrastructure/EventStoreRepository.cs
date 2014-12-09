using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EventStore.ClientAPI;
using Movies_GES.Domain.Base;
using Movies_GES.Domain.Infrastructure;
using Newtonsoft.Json;

namespace Movies_GES.Web.Infrastructure
{
    public class EventStoreRepository<T> : IRepository<T> where T : AggregateRoot
    {
        private readonly IEventStoreConnection _eventStoreConnection;

        public EventStoreRepository(IEventStoreConnection eventStoreConnection)
        {
            _eventStoreConnection = eventStoreConnection;
        }

        public T GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task Save(T aggregate, Guid commitId)
        {
            var changes = aggregate.GetUncommittedChanges();
            var events = DomainEventsToEventData(changes);

            await _eventStoreConnection.AppendToStreamAsync(
                   aggregate.Id.ToString(),
                   ExpectedVersion.Any,
                   events);
        }

        private static IEnumerable<EventData> DomainEventsToEventData(IEnumerable<DomainEvent> changes)
        {
            return (from change in changes
                    let json = JsonConvert.SerializeObject(change)
                    let bytes = Encoding.UTF8.GetBytes(json)
                    select new EventData(Guid.NewGuid(),
                        change.GetType().FullName,
                        true,
                        bytes,
                        null))
                .ToList();
        }
    }
}