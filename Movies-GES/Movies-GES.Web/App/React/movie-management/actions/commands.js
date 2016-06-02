import uuid from 'uuid';
import { execute } from './cedar';

export const updateTitle = (movieId, title) => {
    const command = {
        commandName: 'TitleMovie',
        commandId: uuid.v4(),
        movieId,
        title,
    };

    return execute(command);
};
