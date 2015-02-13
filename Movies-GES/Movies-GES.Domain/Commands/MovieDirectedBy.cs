using System;

namespace Movies_GES.Domain.Commands
{
    public class MovieDirectedBy
    {
        public Guid MovieId { get; set; }
        public string Director { get; set; }        
    }
}