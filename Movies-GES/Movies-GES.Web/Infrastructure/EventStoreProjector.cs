using System;
using System.Diagnostics;
using System.Text;
using EventStore.ClientAPI;
using Movies_GES.Domain.Base;
using Newtonsoft.Json;
using ServiceStack.Redis;
using TinyMessenger;

namespace Movies_GES.Web.Infrastructure
{
    public class EventStoreProjector
    {
        private readonly ITinyMessengerHub _hub;
        private readonly IEventStoreConnection _connection;
        private EventStoreAllCatchUpSubscription _subscription;
        private IRedisClientsManager _clientsManager;
        private const string LastcheckpointKey = "urn:LastCheckpoint:last";

        public EventStoreProjector(IEventStoreConnection connection, ITinyMessengerHub hub,
            IRedisClientsManager clientsManager)
        {
            _connection = connection;
            _clientsManager = clientsManager;
            _hub = hub;
        }

        public void Start()
        {
            var lastCheckpoint = LoadLastCheckpoint();

            _subscription = _connection.SubscribeToAllFrom(
               lastCheckpoint,
               false,
               OnEventAppeared,
               OnLiveProcessingStarted,
               OnSubscriptionDropped);
        }

        private void OnEventAppeared(EventStoreCatchUpSubscription catchUpSubscription, ResolvedEvent resolvedEvent)
        {
            if (resolvedEvent.Event.EventType.StartsWith("$")) return;

            Trace.TraceInformation("Created:       {0}", resolvedEvent.OriginalEvent.Created);
            Trace.TraceInformation("OriginalEventStreamId: {0}", resolvedEvent.OriginalEvent.EventStreamId);
            Trace.TraceInformation("OriginalEventType:     {0}", resolvedEvent.OriginalEvent.EventType);
            Trace.TraceInformation("OriginalEventData:     {0}", Encoding.UTF8.GetString(resolvedEvent.Event.Data));

            var eventType = Type.GetType(resolvedEvent.OriginalEvent.EventType + ", " + typeof(DomainEvent).Assembly.FullName);

            var json = Encoding.UTF8.GetString(resolvedEvent.OriginalEvent.Data);
            var @event = JsonConvert.DeserializeObject(json, eventType) as dynamic;

            _hub.Publish(@event);

            SaveLastCheckPoint(resolvedEvent);
        }

        private void OnLiveProcessingStarted(EventStoreCatchUpSubscription s)
        {
            Trace.TraceInformation("Live");
        }

        private void OnSubscriptionDropped(EventStoreCatchUpSubscription catchUpSubscription, SubscriptionDropReason reason, Exception ex)
        {
            if (reason != SubscriptionDropReason.UserInitiated)
            {
                Trace.TraceWarning("EventStoreCatchUpSubscription Dropped");
                Trace.TraceWarning(catchUpSubscription.ToString());
                Trace.TraceWarning(reason.ToString());
                Trace.TraceWarning(ex.ToString());

                Start();
            }
        }

        private Position LoadLastCheckpoint()
        {
            using (var client = _clientsManager.GetClient())
            {
                var lastCheckpoint = Position.Start;
                var checkpoint = client.Get<LastCheckpoint>(LastcheckpointKey);
                if (checkpoint != null)
                {
                    lastCheckpoint = new Position(checkpoint.CommitPosition, checkpoint.PreparePosition);
                }
                return lastCheckpoint;
            }
        }

        private void SaveLastCheckPoint(ResolvedEvent resolvedEvent)
        {
            if (resolvedEvent.OriginalPosition.HasValue)
            {
                using (var client = _clientsManager.GetClient())
                {
                    var lastCheckpoint = new LastCheckpoint(resolvedEvent.OriginalPosition.Value);
                    client.Set(LastcheckpointKey, lastCheckpoint);
                }
            }
        }

        public class LastCheckpoint
        {
            public LastCheckpoint()
            {
            }

            public LastCheckpoint(Position position)
            {
                CommitPosition = position.CommitPosition;
                PreparePosition = position.PreparePosition;
            }

            public long CommitPosition { get; set; }
            public long PreparePosition { get; set; }
        }
    }


}