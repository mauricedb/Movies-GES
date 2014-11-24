using System;

namespace Movies_GES.Domain.Commands
{
    public class TitleMovie
    {
        public Guid Id { get; set; }
        public Guid MovieId { get; set; }
        public string Title { get; set; }
    }
}