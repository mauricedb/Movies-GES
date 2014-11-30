using System;
using TinyMessenger;

namespace Movies_GES.Domain.Commands
{
    public class TitleMovie: ITinyMessage
    {
        public Guid Id { get; set; }
        public Guid MovieId { get; set; }
        public string Title { get; set; }

        public object Sender
        {
            get { throw new NotImplementedException(); }
        }

        public Exception Exception { get; set; }
    }
}