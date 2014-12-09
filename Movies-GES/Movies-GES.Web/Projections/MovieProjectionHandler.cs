using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Movies_GES.Domain.Domain;

namespace Movies_GES.Web.Projections
{
    public class MovieProjectionHandlers
    {
        public Task Handle(MovieTitled movieTitled)
        {
            Trace.TraceInformation(movieTitled.ToString());

            return Task.FromResult(0);
        }
    }
}