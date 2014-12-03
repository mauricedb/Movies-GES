using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using EventStore.ClientAPI;
using EventStore.ClientAPI.SystemData;
using Movies_GES.Domain.Base;
using Movies_GES.Domain.Infrastructure;
using Newtonsoft.Json;

namespace Movies_GES.Web.Infrastructure
{
    public class EventStoreRepository<T> : IRepository<T> where T : AggregateRoot
    {
        public T GetById(System.Guid id)
        {
            throw new System.NotImplementedException();
        }

        public void Save(T aggregate, Guid commitId)
        {
            SaveAsync(aggregate, commitId)
                .Wait();
        }

        public async Task SaveAsync(T aggregate, Guid commitId)
        {
            var changes = aggregate.GetUncommittedChanges();
            var events = (from change in changes
                let json = JsonConvert.SerializeObject(change)
                let bytes = Encoding.UTF8.GetBytes(json)
                select new EventData(Guid.NewGuid(),
                    change.GetType().FullName,
                    true,
                    bytes,
                    null))
                .ToList();

            var settings =
                ConnectionSettings.Create().SetDefaultUserCredentials(new UserCredentials("admin", "changeit"));
            using (var connection = EventStoreConnection.Create(settings, new IPEndPoint(IPAddress.Loopback, 1113)))
            {
                connection.AuthenticationFailed += (s, e) => { Console.WriteLine(e.Reason); };
                connection.ErrorOccurred += (s, e) => { Console.WriteLine(e); };
                connection.Closed += (s, e) => { Console.WriteLine(e); };
                connection.Connected += (s, e) =>
                {
                    Console.WriteLine("Connected");
                    Console.WriteLine(e);
                };
                connection.Disconnected += (s, e) => { Console.WriteLine(e); };
                connection.Reconnecting += (s, e) => { Console.WriteLine(e); };


                await connection.ConnectAsync().ConfigureAwait(false);

                //using (var connection = EventStoreConnection.Create(new IPEndPoint(IPAddress.Loopback, 113)))
                await
                    connection.AppendToStreamAsync(aggregate.Id.ToString(), ExpectedVersion.Any, events)
                        .ConfigureAwait(false);
            }
        }
    }
}