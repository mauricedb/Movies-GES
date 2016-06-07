using Microsoft.AspNet.SignalR;
using Movies_GES.Domain.Domain;
using Movies_GES.Web.Hubs;

namespace Movies_GES.Web.Projections
{
    public class EventPushHandlers
    {
        public void Handle(MovieTitled movieTitled)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<MoviesHub>();

            context.Clients.All.movieTitled(movieTitled);
        }
    }
}
