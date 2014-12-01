using System;

namespace Movies_GES.Domain.Commands
{
    public class DescribeMovie : CommandBase
    {
        public Guid MovieId { get; set; }
        public string Synopsis { get; set; }
        public string CriticsConsensus { get; set; }
        public int Year { get; set; }
    }
}