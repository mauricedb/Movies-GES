using System;
using TinyMessenger;

namespace Movies_GES.Domain.Commands
{
    public class CommandBase : ITinyMessage
    {
        public Guid CommandId { get; set; }
        public object Sender { get; private set; }
        public Exception Error { get; set; }

        public bool HasError
        {
            get { return Error != null; }
        }
    }
}