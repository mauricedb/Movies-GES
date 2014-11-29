using System;
using Movies_GES.Domain.Base;

namespace Movies_GES.Domain.Domain
{
    public class DirectorNamed : DomainEvent
    {
        public Guid DirectorId { get; private set; }
        public string Name { get; private set; }

        public DirectorNamed(Guid directorId, string name)
        {
            DirectorId = directorId;
            Name = name;
        }

        public override bool Equals(object obj)
        {
            var that = obj as DirectorNamed;
            if (that != null && that.DirectorId == DirectorId && that.Name == Name)
            {
                return true;
            }
            return false;
        }

    }
}