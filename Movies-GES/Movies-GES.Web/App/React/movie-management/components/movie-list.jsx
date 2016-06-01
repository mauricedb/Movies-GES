import React, {Component} from 'react';
import { Link  } from 'react-router';
import { connect } from 'react-redux';
import {loadMovies} from '../actions';

class MovieList extends Component {

    componentWillMount () {
        this.props.loadMovies();
    }

    render() {
        console.table(this.props.movies);
        
        const rows = this.props.movies.map(movie => (
            <tr key={movie.id}> 
            <td>{movie.title}</td>
            <td>{movie.abridgedDirectors.join(', ')}</td>
                <td style={{width:1}}>
                    <Link to={`details/${movie.id}`}
                      className='btn btn-default'>
                        Details
                    </Link> 
                </td>
            </tr>
        ));
        return (<div>
            <p>
                <button className="btn btn-toolbar">
                    Add movie
                </button>
            </p>
            
            <table className='table table-bordered table-striped table-condensed'>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Directed by</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>);
    }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      loadMovies: () => dispatch(loadMovies())
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieList);