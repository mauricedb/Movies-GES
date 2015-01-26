using System;
using System.Collections.Generic;
using Movies_GES.Web.Infrastructure;
using Movies_GES.Web.Models;
using Movies_GES.Web.Projections;

namespace Movies_GES.Domain.Tests.Infrastructure
{
    internal class DummyMovieProjectionRepository : IProjectionRepository<MovieProjection>
    {
        public DummyMovieProjectionRepository()
        {
            List = new Dictionary<Guid, MovieProjection>();
        }

        public Dictionary<Guid, MovieProjection> List { get; private set; }

        public MovieProjection GetById(object key)
        {
            var entity = default(MovieProjection);
            List.TryGetValue((Guid)key, out entity);
            return entity;
        }

        public void Store(MovieProjection entity)
        {
            List[entity.Id] = entity;
        }
    }
}