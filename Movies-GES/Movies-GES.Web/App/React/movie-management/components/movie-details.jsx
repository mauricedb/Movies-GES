import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { movieTitled, movieDescribed, directorAdded, criticsScoreUpdated, audienceScoreUpdated } from '../actions';
import { titleMovie, describeMovie, addDirector, updateCriticsScore, updateAudienceScore } from '../commands';


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
        addDirector={this.props.addDirector}
      />
      <EditScore
        label="Critics Score:"
        id={movie.id}
        score={movie.criticsScore}
        updateScore={this.props.updateCriticsScore}
      />
      <EditScore
        label="Audience Score:"
        id={movie.id}
        score={movie.audienceScore}
        updateScore={this.props.updateAudienceScore}
      />


    </form>);
  }
}

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
  movieId: PropTypes.string.isRequired,
  titleMovie: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  addDirector: PropTypes.func.isRequired,
  updateCriticsScore: PropTypes.func.isRequired,
  updateAudienceScore: PropTypes.func.isRequired,
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
  addDirector: (id, director) => addDirector(id, director)
    .then(dispatch(directorAdded(id, director))),
  updateCriticsScore: (id, score) => updateCriticsScore(id, score)
    .then(dispatch(criticsScoreUpdated(id, score))),
  updateAudienceScore: (id, score) => updateAudienceScore(id, score)
    .then(dispatch(audienceScoreUpdated(id, score))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetails);
