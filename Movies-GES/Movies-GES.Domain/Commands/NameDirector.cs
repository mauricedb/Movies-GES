using System;

namespace Movies_GES.Domain.Commands
{
    public class NameDirector : MessageBase
    {
        public Guid DirectorId { get; set; }
        public string Name { get; set; }
    }
}