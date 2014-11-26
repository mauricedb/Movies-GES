using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Movies_GES.Domain.Handlers;

namespace Movies_GES.Web.Api
{
    public class CommandsController : ApiController
    {
        private readonly MovieHandlers _handler;

        public CommandsController()
        {
            _handler = new MovieHandlers(null);
        }

        public async Task<IHttpActionResult> Put(string id)
        {
            try
            {
                var type = DetermineCommandType(Request);

                if (type != null)
                {
                    dynamic cmd = await Request.Content.ReadAsAsync(type);
                    cmd.MovieId = Guid.NewGuid();
                    cmd.Id = Guid.NewGuid();

                    _handler.Handle(cmd);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return BadRequest();
        }

        private static Type DetermineCommandType(HttpRequestMessage request)
        {
            IEnumerable<string> commandNames;

            if (request.Headers.TryGetValues("x-command-name", out commandNames))
            {
                var commandName = commandNames.Single();

                var query = from asm in AppDomain.CurrentDomain.GetAssemblies()
                    from type in asm.GetTypes()
                    where type.Name == commandName
                          && type.Namespace != null
                          && type.Namespace.EndsWith(".Commands")
                    select type;

                return query.Single();
            }

            return null;
        }
    }
}