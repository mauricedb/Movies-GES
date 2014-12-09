using System;
using System.Diagnostics;
using System.Text;
using EventStore.ClientAPI;
using Movies_GES.Domain.Base;
using Newtonsoft.Json;
using TinyMessenger;

namespace Movies_GES.Web.Projections
{
    public class EventStoreProjector
    {
        private readonly ITinyMessengerHub _hub;

        public EventStoreProjector(IEventStoreConnection connection, ITinyMessengerHub hub)
        {
            _hub = hub;

            connection.SubscribeToAllFrom(
                Position.Start,
                false,
                OnEventAppeared,
                OnLiveProcessingStarted,
                OnSubscriptionDropped);
        }

        private void OnEventAppeared(EventStoreCatchUpSubscription catchUpSubscription, ResolvedEvent resolvedEvent)
        {
            if (resolvedEvent.Event.EventType.StartsWith("$")) return;

            Trace.TraceInformation("Created:       {0}", resolvedEvent.Event.Created);
            Trace.TraceInformation("EventStreamId: {0}", resolvedEvent.Event.EventStreamId);
            Trace.TraceInformation("EventType:     {0}", resolvedEvent.Event.EventType);
            Trace.TraceInformation("EventData:     {0}", Encoding.UTF8.GetString(resolvedEvent.Event.Data));

            var eventType = Type.GetType(resolvedEvent.Event.EventType + ", " + typeof(DomainEvent).Assembly.FullName);

            var json = Encoding.UTF8.GetString(resolvedEvent.Event.Data);
            var @event = JsonConvert.DeserializeObject(json, eventType) as dynamic;

            _hub.Publish(@event);
        }

        private void OnLiveProcessingStarted(EventStoreCatchUpSubscription s)
        {
            Trace.TraceInformation("Live");
        }

        private void OnSubscriptionDropped(EventStoreCatchUpSubscription catchUpSubscription, SubscriptionDropReason reason, Exception ex)
        {
            Trace.TraceWarning("Dropped");
            Trace.TraceWarning(catchUpSubscription.ToString());
            Trace.TraceWarning(reason.ToString());
            Trace.TraceWarning(ex.ToString());
        }
    }
}