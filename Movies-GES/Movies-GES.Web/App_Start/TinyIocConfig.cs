using System;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using EventStore.ClientAPI;
using EventStore.ClientAPI.SystemData;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Domain;
using Movies_GES.Domain.Handlers;
using Movies_GES.Domain.Infrastructure;
using Movies_GES.Web.Infrastructure;
using Movies_GES.Web.Models;
using Movies_GES.Web.Projections;
using ServiceStack.Redis;
using TinyIoC;
using TinyMessenger;
using Director = Movies_GES.Domain.Domain.Director;

namespace Movies_GES.Web
{
    public static class TinyIocConfig
    {
        public static void Register(TinyIoCContainer container)
        {
            RegisterTypes(container).Wait();
            RegisterMessageSubscribers(container);
        }

        private static async Task RegisterTypes(TinyIoCContainer container)
        {
            var connection = await CreateEventStoreConnection();

            container.Register((_, __) => connection);
#if DOCKER
            var redisManagerPool = new RedisManagerPool("docker");
#else
            var redisManagerPool = new RedisManagerPool();
#endif
            container.Register<IRedisClientsManager>((_, __) => redisManagerPool);

            container.Register<MovieHandlers>().AsSingleton();
            container.Register<DirectorHandlers>().AsSingleton();

            //container.Register<IRepository<Movie>, InMemoryRepository<Movie>>().AsSingleton();
            //container.Register<IRepository<Director>, InMemoryRepository<Director>>().AsSingleton();
            container.Register<IRepository<Movie>, EventStoreRepository<Movie>>().AsSingleton();
            container.Register<IRepository<Director>, EventStoreRepository<Director>>().AsSingleton();

            container.Register<IProjectionRepository<MovieProjection>, MovieProjectionRepository>();

            container.Register<MovieProjectionHandlers>();
            container.Register<EventPushHandlers>();

           container.Resolve<EventStoreProjector>().Start();
        }

        private static async Task<IEventStoreConnection> CreateEventStoreConnection()
        {
            var settings = ConnectionSettings
                .Create()
                .UseDebugLogger()
                .EnableVerboseLogging()
                .SetDefaultUserCredentials(new UserCredentials("admin", "changeit"));
#if DOCKER
            var address = Dns.GetHostEntry("docker").AddressList.First();
#else
            var address = IPAddress.Loopback;
#endif
            var connection = EventStoreConnection.Create(settings, new IPEndPoint(
                address, 1113));

            connection.AuthenticationFailed += (s, e) => Trace.TraceWarning("AuthenticationFailed: {0}", e.Reason);
            connection.ErrorOccurred += (s, e) => Trace.TraceWarning("ErrorOccurred: {0}", e.Exception);
            connection.Closed += (s, e) => Trace.TraceWarning("Closed: {0}", e.Reason);
            connection.Connected += (s, e) => Trace.TraceWarning("Connected: {0}", e.RemoteEndPoint);
            connection.Disconnected += (s, e) => Trace.TraceWarning("Disconnected: {0}", e.RemoteEndPoint);
            connection.Reconnecting += (s, e) => Trace.TraceWarning("Reconnecting: {0}", e);


            await connection.ConnectAsync();
            return connection;
        }

        private static void RegisterMessageSubscribers(TinyIoCContainer container)
        {
            var messengerHub = container.Resolve<ITinyMessengerHub>();
            var movieProjectionHandlers = container.Resolve<MovieProjectionHandlers>();
            var eventPushHandlers = container.Resolve<EventPushHandlers>();
            
            messengerHub.Subscribe<MovieTitled>(movieProjectionHandlers.Handle);
            messengerHub.Subscribe<MovieTitled>(eventPushHandlers.Handle);
            messengerHub.Subscribe<MovieDescribed>(movieProjectionHandlers.Handle);
            messengerHub.Subscribe<MovieRatedByAudience>(movieProjectionHandlers.Handle);
            messengerHub.Subscribe<MovieRatedByCritics>(movieProjectionHandlers.Handle);
            messengerHub.Subscribe<DirectorAddedToMovie>(movieProjectionHandlers.Handle);
        }
    }
}