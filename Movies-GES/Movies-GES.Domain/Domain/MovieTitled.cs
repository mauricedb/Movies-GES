using System;
using Movies_GES.Domain.Base;

namespace Movies_GES.Domain.Domain
{
    public class MovieTitled : DomainEvent
    {
        public Guid Id { get; private set; }
        public string Title { get; private set; }

        public MovieTitled(Guid id, string title)
        {
            Id = id;
            Title = title;
        }

        public override bool Equals(object obj)
        {
            var that = obj as MovieTitled;
            if (that != null && that.Id == Id && that.Title == Title)
            {
                return true;
            }
            return false;
        }
    }
}