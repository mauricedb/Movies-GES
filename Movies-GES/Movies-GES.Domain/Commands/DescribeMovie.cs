using System;
using ReflectionMagic;

namespace Movies_GES.Domain.Commands
{
    public class DescribeMovie
    {
        public Guid MovieId { get; set; }
        public string Synopsis { get; set; }
        public string CriticsConsensus { get; set; }
        public int Year { get; set; }

        public string MpaaRating { get; set; }
    }
}