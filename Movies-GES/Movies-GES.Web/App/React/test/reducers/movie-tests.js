import chai from 'chai';
import reducer from '../../movie-management/reducers/movie';
import * as actions from '../../movie-management/actions';

chai.should();

describe('The movie reducer', () => {
  it('should return the initial state', () => {

    const state = reducer(undefined, {});

    state.should.deep.equal({ status: '' });
  });

  it('can handle movie titled for the same movie', () => {

    const state = reducer({id: 1}, actions.movieTitled(1, 'The title'));

    state.should.deep.equal({ id: 1 , title: 'The title'});
  });

  it('can handle movie titled for a different movie', () => {

    const state = reducer({id: 2, title: 'Some movie'}, actions.movieTitled(1, 'The title'));

    state.should.deep.equal({ id: 2 , title: 'Some movie'});
  });
});
