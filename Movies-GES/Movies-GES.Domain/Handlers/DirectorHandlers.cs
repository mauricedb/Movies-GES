using System;
using System.Threading.Tasks;
using Movies_GES.Domain.Commands;
using Movies_GES.Domain.Domain;
using Movies_GES.Domain.Infrastructure;

namespace Movies_GES.Domain.Handlers
{
    public class DirectorHandlers
    {
        private readonly IRepository<Director> _repository;

        public DirectorHandlers(IRepository<Director> repository)
        {
            _repository = repository;
        }

        public Task Handle(NameDirector command, Guid commandId)
        {
            command.DirectorId = Guid.NewGuid();

            var director = new Director(command.DirectorId, command.Name);
            return _repository.Save(director, commandId);
        }
    }
}