import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class MovieList extends Component {

  render() {
    const { movies } = this.props;

    const rows = movies.map(movie => (
      <tr key={movie.id}>
        <td>{movie.title}</td>
        <td>{movie.abridgedDirectors.join(', ')}</td>
        <td style={{ width: 1 }}>
          <Link
            to={`details/${movie.id}`}
            className="btn btn-default"
          >
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

      <table className="table table-bordered table-striped table-condensed">
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

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
});

export default connect(
  mapStateToProps,
)(MovieList);
