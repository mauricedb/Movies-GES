using System;

namespace Movies_GES.Domain.Commands
{
    public class NameDirector
    {
        public Guid Id { get; set; }
        public Guid DirectorId { get; set; }
        public string Name { get; set; }
        
    }
}