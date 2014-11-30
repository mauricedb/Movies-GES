﻿using System;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Domain;
using Movies_GES.Domain.Handlers;
using Movies_GES.Domain.Infrastructure;
using Movies_GES.Web.Infrastructure;
using TinyIoC;
using TinyMessenger;

namespace Movies_GES.Web
{
    public static class TinyIocConfig
    {
        public static void Register(TinyIoCContainer container)
        {
            RegisterTypes(container);
            RegisterMessageSubscribers(container);
        }

        private static void RegisterTypes(TinyIoCContainer container)
        {
            container.Register<MovieHandlers>().AsSingleton();
            container.Register<IRepository<Movie>, InMemoryMovieRepository>().AsSingleton();
        }

        private static void RegisterMessageSubscribers(TinyIoCContainer container)
        {
            var messengerHub = container.Resolve<ITinyMessengerHub>();
            var movieHandlers = container.Resolve<MovieHandlers>();

            messengerHub.Subscribe<TitleMovie>(cmd => WrappedHandler(movieHandlers, cmd));
        }

        private static void WrappedHandler(dynamic handler, dynamic cmd)
        {
            try
            {
                handler.Handle(cmd);
            }
            catch (Exception ex)
            {
                cmd.Exception = ex;
            }
        }
    }
}