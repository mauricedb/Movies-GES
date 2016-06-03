import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loadMovie, titleUpdated, descriptionUpdated, criticsScoreUpdated } from '../actions';
import { updateTitle, describeMovie, updateCriticsScore } from '../actions/commands';

import { Modal, OverlayTrigger } from 'react-bootstrap';

import MovieTitle from './movie-title';
import MovieDescription from './movie-description.jsx';
import CriticsScore from './critics-score.jsx';


class MovieDetails extends Component {

    componentWillMount() {
        this.props.loadMovie(this.props.movieId);
    }

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
console.log(movie)
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
            <CriticsScore
              id={movie.id}
              score={movie.criticsScore}
              updateScore={this.props.updateCriticsScore}
            />

            In MovieDetails
            <p>
                Title: {movie.title}
            </p>
            <hr />
            <Link to="list">List</Link>
        </form>);
    }
}

MovieDetails.propTypes = {
    movie: PropTypes.object.isRequired,
    movieId: PropTypes.string.isRequired,
    loadMovie: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        movie: state.movie,
        movieId: ownProps.params.id,
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadMovie: (id) => dispatch(loadMovie(id)),
    updateTitle: (id, title) => updateTitle(id, title)
            .then(dispatch(titleUpdated(id, title))),
    updateDescription: (id, description) => describeMovie(id, description)
        .then(dispatch(descriptionUpdated(id, description))),
    updateCriticsScore: (id, score) => updateCriticsScore(id, score)
        .then(dispatch(criticsScoreUpdated(id, score))),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieDetails);


// <form>
//
//
//    <div class="form-group">
//        <label for="title">Directors</label>
//        <button class="btn btn-default"
//                ng-click="ctrl.addDirector(ctrl.movie)">
//            Add
//        </button>
//        <ul>
//            <li ng-repeat="director in ctrl.movie.abridgedDirectors">
//                {{director}}
//            </li>
//        </ul>
//    </div>
//
//    <div class="form-group">
//        <label for="criticsScore">CriticsScore:</label>
//        {{ctrl.movie.criticsScore}}
//        <button class="btn btn-xs" ng-click="ctrl.rateCritics(ctrl.movie)">Score</button>
//    </div>
//
//    <div class="form-group">
//        <label for="audienceScore">AudienceScore</label>
//        {{ctrl.movie.audienceScore}}
//        <button class="btn btn-xs" ng-click="ctrl.rateAudience(ctrl.movie)">Score</button>
//    </div>
//
//
//
//    <!--<div class="form-group">
//        <label for="title">Genres</label>
//        <input type="text" class="form-control" id="title" ng-model="ctrl.movie.Genres">
//    </div>
//
//    <div class="form-group">
//        <label for="title">Posters</label>
//        <input type="text" class="form-control" id="title" ng-model="ctrl.movie.Posters">
//    </div>
//
//    <div class="form-group">
//        <label for="title">AbridgedCast</label>
//        <input type="text" class="form-control" id="title" ng-model="ctrl.movie.AbridgedCast">
//    </div>-->
//
//
//
// </form>
