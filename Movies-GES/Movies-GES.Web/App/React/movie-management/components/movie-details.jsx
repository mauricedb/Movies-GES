import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  movieTitled,
  movieDescribed,
  directorAddedToMovie,
  movieRatedByCritics,
  movieRatedByAudience
} from '../actions';
import {
  titleMovie,
  describeMovie,
  addDirectorToMovie,
  rateMovieByCrictics,
  rateMovieByAudience
} from '../commands';


import MovieTitle from './movie-title';
import MovieDescription from './movie-description.jsx';
import MovieDirectors from './movie-directors.jsx';
import EditScore from './edit-score.jsx';


class MovieDetails extends Component {
  render() {
    const { movie } = this.props;

    if (movie.status !== 'LOADED') {
      return (<div />);
    }

    const description = {
      synopsis: movie.synopsis,
      criticsConsensus: movie.criticsConsensus,
      year: movie.year || 0,
      mpaaRating: movie.mpaaRating,
    };

    return (<form>
      <MovieTitle
        title={movie.title}
        id={movie.id}
        titleMovie={this.props.titleMovie}
      />
      <MovieDescription
        id={movie.id}
        description={description}
        updateDescription={this.props.updateDescription}
      />
      <MovieDirectors
        abridgedDirectors={movie.abridgedDirectors}
        id={movie.id}
        addDirectorToMovie={this.props.addDirectorToMovie}
      />
      <EditScore
        label="Critics Score:"
        id={movie.id}
        score={movie.criticsScore}
        updateScore={this.props.rateMovieByCrictics}
      />

      <EditScore
        label="Audience Score:"
        id={movie.id}
        score={movie.audienceScore}
        updateScore={this.props.rateMovieByAudience}
      />

    </form>);
  }
}



MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
  movieId: PropTypes.string.isRequired,
  titleMovie: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  addDirectorToMovie: PropTypes.func.isRequired,
  rateMovieByCrictics: PropTypes.func.isRequired,
  rateMovieByAudience: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    movie: state.movie,
    movieId: ownProps.params.id,
  };
}

const mapDispatchToProps = (dispatch) => ({
  titleMovie: (id, title) => titleMovie(id, title)
    .then(dispatch(movieTitled(id, title))),
  updateDescription: (id, description) => describeMovie(id, description)
    .then(dispatch(movieDescribed(id, description))),
  addDirectorToMovie: (id, director) => addDirectorToMovie(id, director)
    .then(dispatch(directorAddedToMovie(id, director))),
  rateMovieByCrictics: (id, score) => rateMovieByCrictics(id, score)
    .then(dispatch(movieRatedByCritics(id, score))),
  rateMovieByAudience: (id, score) => rateMovieByAudience(id, score)
    .then(dispatch(movieRatedByAudience(id, score))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetails);
