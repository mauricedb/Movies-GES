using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Movies_GES.Domain.Commands;
using TinyMessenger;

namespace Movies_GES.Web.Api
{
    public class CommandsController : ApiController
    {
        private readonly ITinyMessengerHub _messengerHub;

        public CommandsController(ITinyMessengerHub messengerHub)
        {
            _messengerHub = messengerHub;
        }

        public async Task<IHttpActionResult> Put(Guid id)
        {
            try
            {
                var type = DetermineCommandType(Request);

                if (type != null)
                {
                    dynamic cmd = await Request.Content.ReadAsAsync(type);
                    cmd.CommandId = id;

                    _messengerHub.Publish(cmd);

                    if (cmd.HasError)
                    {
                        return HandleCommandError(cmd);
                    }

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return BadRequest(string.Format("No command found to execute"));
        }

        private IHttpActionResult HandleCommandError(CommandBase cmd)
        {
            if (cmd.Error is ArgumentException)
            {
                ModelState.AddModelError("Exception", cmd.Error);
                return BadRequest(ModelState);
            }

            throw cmd.Error;
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