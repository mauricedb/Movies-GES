using Movies_GES.Domain.Domain;
using Movies_GES.Domain.Handlers;
using Movies_GES.Domain.Infrastructure;
using TinyIoC;

namespace Movies_GES.Web
{
    public static class TinyIocConfig
    {
        public static void Register()
        {
            var container = TinyIoCContainer.Current;

            container.Register<MovieHandlers>();

            container.Register<IRepository<Movie>>((cContainer, overloads) => null);

        }
    }
}