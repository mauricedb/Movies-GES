using TinyMessenger;

namespace Movies_GES.Domain.Base
{
    public class DomainEvent : ITinyMessage
    {
        public object Sender { get; private set; }
    }
}