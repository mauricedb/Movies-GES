import $ from 'jquery';

export const execute = (command) => {
    var deferred = new $.Deferred();

    $.ajax({
        url: '/api/commands/' + command.commandId,
        type: 'PUT',
        contentType: 'application/vnd.movies_ges.domain.commands.' + command.commandName.toLowerCase() + '+json',
        accepts: 'application/problem+json',
        data: JSON.stringify(command),
        error: function(data){
            deferred.reject(data);
        },
        success: function(data){
            deferred.resolve(data);
        }
    });

    return deferred.promise();
};
