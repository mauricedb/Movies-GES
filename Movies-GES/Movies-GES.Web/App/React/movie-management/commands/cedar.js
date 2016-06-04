import $ from 'jquery';

export const execute = (command) => {
  const deferred = new $.Deferred();

  $.ajax({
    url: `/api/commands/${command.commandId}`,
    type: 'PUT',
    contentType: 'application/vnd.movies_ges.domain.commands.' +
            `${command.commandName.toLowerCase()}+json`,
    accepts: 'application/problem+json',
    data: JSON.stringify(command),
    error(data) {
      deferred.reject(data);
    },
    success(data) {
      deferred.resolve(data);
    },
  });

  return deferred.promise();
};
