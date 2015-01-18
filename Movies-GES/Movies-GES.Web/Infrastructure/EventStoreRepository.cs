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

        public async Task<T> GetById(Guid id)
        {
            try
            {

                var aggregate = default(T);

                //var stream = await _eventStoreConnection.ReadStreamEventsForwardAsync(id.ToString(), 0, int.MaxValue, false);

                //if (stream.Status == SliceReadStatus.Success)
                //{
                //    var changes = EventDataToDomainEvents(stream.Events);
                //    aggregate = (T)Activator.CreateInstance(typeof(T), true);

                //    aggregate.LoadsFromHistory(changes);
                //}

                var resolvedEvent = await ReadStreamEvents(id.ToString());
                if (resolvedEvent.Any())
                {
                    var changes = EventDataToDomainEvents(resolvedEvent);
                    aggregate = (T)Activator.CreateInstance(typeof(T), true);

                    aggregate.LoadsFromHistory(changes);

                }

                return aggregate;
            }
            catch (Exception ex)
            {
                var x = ex.ToString();
                throw;
            }
        }


        private async Task<List<ResolvedEvent>> ReadStreamEvents(string id)
        {

            var streamEvents = new List<ResolvedEvent>();

            StreamEventsSlice currentSlice;
            var nextSliceStart = StreamPosition.Start;
            do
            {
                currentSlice = await _eventStoreConnection.ReadStreamEventsForwardAsync(id, nextSliceStart, 200, false);

                nextSliceStart = currentSlice.NextEventNumber;

                streamEvents.AddRange(currentSlice.Events);
            } while (!currentSlice.IsEndOfStream);

            return streamEvents;
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

        private static IEnumerable<DomainEvent> EventDataToDomainEvents(IEnumerable<ResolvedEvent> resolvedEvents)
        {
            var result = new List<DomainEvent>();

            foreach (var resolvedEvent in resolvedEvents)
            {
                var eventType = Type.GetType(resolvedEvent.OriginalEvent.EventType + ", " + typeof(DomainEvent).Assembly.FullName);

                var json = Encoding.UTF8.GetString(resolvedEvent.OriginalEvent.Data);
                var domainEvent = JsonConvert.DeserializeObject(json, eventType) as DomainEvent;
                result.Add(domainEvent);
            }

            return result;
        }
    }
}