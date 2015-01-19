using System;
using TinyMessenger;

namespace Movies_GES.Domain.Commands
{
    public class CommandBase 
    {
        public Guid CommandId { get; set; }
    }
}