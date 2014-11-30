using System;

namespace Movies_GES.Domain.Commands
{
    public class TitleMovie : MessageBase
    {
        public Guid MovieId { get; set; }
        public string Title { get; set; }
    }
}