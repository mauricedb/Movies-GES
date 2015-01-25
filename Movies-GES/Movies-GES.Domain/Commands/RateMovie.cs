using System;

namespace Movies_GES.Domain.Commands
{
    public class RateMovie
    {
        public Guid MovieId { get; set; }
        public int Rating { get; set; }
    }
}