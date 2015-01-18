﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
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

                var resolvedEvent = ReadStreamEvents(id.ToString());
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


        private List<ResolvedEvent> ReadStreamEvents(string id)
        {
            var streamEvents = new List<ResolvedEvent>();


            StreamEventsSlice currentSlice = null;
            var nextSliceStart = StreamPosition.Start;
            do
            {
                try
                {
                    currentSlice = _eventStoreConnection.ReadStreamEventsForwardAsync(id, nextSliceStart, 200, false).Result;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex.Message);
                }

                nextSliceStart = currentSlice.NextEventNumber;

                streamEvents.AddRange(currentSlice.Events);
            } while (!currentSlice.IsEndOfStream);

            return streamEvents;
        }

        public void Save(T aggregate, Guid commitId)
        {
            var changes = aggregate.GetUncommittedChanges();
            var events = DomainEventsToEventData(changes);

            _eventStoreConnection.AppendToStreamAsync(
                aggregate.Id.ToString(),
                ExpectedVersion.Any,
                events).Wait();
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
            return (from resolvedEvent in resolvedEvents
                    let eventType = Type.GetType(resolvedEvent.OriginalEvent.EventType + ", " + typeof(DomainEvent).Assembly.FullName)
                    let json = Encoding.UTF8.GetString(resolvedEvent.OriginalEvent.Data)
                    select JsonConvert.DeserializeObject(json, eventType) as DomainEvent)
                .ToList();
        }
    }
}