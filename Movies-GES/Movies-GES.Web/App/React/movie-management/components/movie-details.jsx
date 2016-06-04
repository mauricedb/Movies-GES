import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loadMovie, titleUpdated, descriptionUpdated, directorAdded , criticsScoreUpdated, audienceScoreUpdated } from '../actions';
import { updateTitle, describeMovie, addDirector, updateCriticsScore, updateAudienceScore } from '../commands';

import { Modal, OverlayTrigger } from 'react-bootstrap';

import MovieTitle from './movie-title';
import MovieDescription from './movie-description.jsx';
import MovieDirectors from './movie-directors.jsx';
import EditScore from './edit-score.jsx';


class MovieDetails extends Component {
    render() {
        const {movie} = this.props;

        if (movie.status !== 'LOADED'){
            return (<div />)
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
              updateTitle={this.props.updateTitle}
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
    updateTitle: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        movie: state.movie,
        movieId: ownProps.params.id,
    };
}

const mapDispatchToProps = (dispatch) => ({
    updateTitle: (id, title) => updateTitle(id, title)
            .then(dispatch(titleUpdated(id, title))),
    updateDescription: (id, description) => describeMovie(id, description)
        .then(dispatch(descriptionUpdated(id, description))),
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
