import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loadMovie } from '../actions';
import MovieTitle from './movie-title';


class MovieDetails extends Component {

    componentWillMount() {
        this.props.loadMovie(this.props.movieId);
    }


    render() {
        return (<form>
            <MovieTitle title={this.props.movie.title} />
            In MovieDetails
            <p>
                Title: {this.props.movie.title}
            </p>
            <hr />
            <Link to="list">List</Link>
        </form>);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        movie: state.movie,
        movieId: ownProps.params.id,
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadMovie: (id) => dispatch(loadMovie(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieDetails);


// <form>
//
//    <div ng-controller="movie-description-controller">
//        <button class="btn btn-xs btn-default btn-edit pull-right" ng-show="readonly" ng-click="readonly=false;">Edit</button>
//        <button class="btn btn-xs btn-default pull-right" ng-show="!readonly" ng-click="readonly=true;">Cancel</button>
//        <button class="btn btn-xs btn-default pull-right" ng-show="!readonly" ng-click="save()">Save</button>
//
//        <div class="form-group">
//            <label for="synopsis">Synopsis</label>
//            <input type="text" class="form-control" id="synopsis" ng-model="ctrl.movie.synopsis" ng-disabled="readonly">
//        </div>
//
//        <div class="form-group">
//            <label for="criticsConsensus">Critics Consensus</label>
//            <input type="text" class="form-control" id="criticsConsensus" ng-model="ctrl.movie.criticsConsensus" ng-disabled="readonly">
//        </div>
//
//        <div class="form-group">
//            <label for="year">Year</label>
//            <input type="text" class="form-control" id="year" ng-model="ctrl.movie.year" ng-disabled="readonly">
//        </div>
//
//        <div class="form-group">
//            <label for="mpaaRating">MPAA Rating</label>
//            <input type="text" class="form-control" id="mpaaRating" ng-model="ctrl.movie.mpaaRating" ng-disabled="readonly">
//        </div>
//
//    </div>
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
