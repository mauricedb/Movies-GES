using System;
using TinyMessenger;

namespace Movies_GES.Domain.Commands
{
    public class MessageBase : ITinyMessage
    {
        public Guid Id { get; set; }
        public object Sender { get; private set; }
        public Exception Exception { get; set; }
    }
}