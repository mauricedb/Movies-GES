import uuid from 'uuid';
import {execute} from './cedar';

export const updateTitle = (id, title) => {

    const command = {
        commandName: 'TitleMovie',
        commandId: uuid.v4(),
        movieId: id,
        title: title
    };

    return execute(command);
    //.then( () => {
    //
    //})
};
