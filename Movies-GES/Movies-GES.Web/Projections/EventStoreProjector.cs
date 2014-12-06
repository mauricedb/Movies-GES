using System;
using System.Diagnostics;
using System.Text;
using EventStore.ClientAPI;

namespace Movies_GES.Web.Projections
{
    public class EventStoreProjector
    {
        private readonly IEventStoreConnection _connection;

        public EventStoreProjector(IEventStoreConnection connection)
        {
            _connection = connection;

            _connection.SubscribeToAllFrom(
                Position.Start, 
                false, 
                OnEventAppeared, 
                OnLiveProcessingStarted, 
                OnSubscriptionDropped);
        }

        private void OnEventAppeared(EventStoreCatchUpSubscription catchUpSubscription, ResolvedEvent resolvedEvent)
        {
            if (resolvedEvent.Event.EventType.StartsWith("$")) return;

            Trace.TraceWarning("Created:       {0}", resolvedEvent.Event.Created);
            Trace.TraceWarning("EventStreamId: {0}", resolvedEvent.Event.EventStreamId);
            Trace.TraceWarning("EventType:     {0}", resolvedEvent.Event.EventType);
            Trace.TraceWarning(Encoding.UTF8.GetString(resolvedEvent.Event.Data));
        }

        private void OnLiveProcessingStarted(EventStoreCatchUpSubscription s)
        {
            Trace.TraceWarning("Live");
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