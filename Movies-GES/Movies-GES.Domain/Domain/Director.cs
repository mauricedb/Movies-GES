using System;
using Movies_GES.Domain.Base;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Domain.Domain
{
    public class Director : AggregateRoot
    {
        private string _name;
        private Guid _id;

        public Director(Guid id, string name)
        {
            Guard.Requires<ArgumentException>(id != Guid.Empty);
            Guard.Requires<ArgumentException>(!string.IsNullOrWhiteSpace(name), "Please enter a title");

            ApplyChanges(new DirectorNamed(id, name));
        }

        public override Guid Id { get { return _id; } }

        public void Apply(DirectorNamed directorNamed)
        {
            _id = directorNamed.DirectorId;
            _name = directorNamed.Name;
        }
    }
}