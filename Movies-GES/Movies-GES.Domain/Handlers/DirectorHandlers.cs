using System;
using Movies_GES.Domain.Base;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Domain;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Domain.Handlers
{
    public class DirectorHandlers:
        IHandles<NameDirector>
    {
        private readonly IRepository<Director> _repository;

        public DirectorHandlers(IRepository<Director> repository)
        {
            _repository = repository;
        }

        public void Handle(NameDirector command)
        {
            command.DirectorId = Guid.NewGuid();
            command.Id = Guid.NewGuid();

            var director = new Director(command.DirectorId, command.Name);
            _repository.Save(director, command.Id);
        }
    }
}