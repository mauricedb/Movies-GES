import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

export default class MovieDirectors extends Component {

  constructor() {
    super();

    this.state = {
      director: '',
      editMode: false,
    };

    this.toEditMode = (e) => {
      e.preventDefault();
      this.setState({
        editMode: true,
      });
    };

    this.directorChanged = (e) => {
      this.setState({
        director: e.target.value,
      });
    };

    this.cancelEdit = () => {
      this.setState({
        director: '',
        editMode: false,
      });
    };

    this.addDirectorToMovie = () => {
      this.props.addDirectorToMovie(this.props.id, this.state.director)
        .then(() => {
          this.setState({
            editMode: false,
          });
        });
    };
  }

  render() {
    const abridgedDirectors = this.props.abridgedDirectors.map((director, i) => (
      <li
        key={director + i}
      >
        {director}
      </li>));

    return (
      <div className="form-group">
        <label>Directors</label>
        &nbsp;
        <button
          className="btn btn-default"
          onClick={this.toEditMode}
        >
          Add
        </button>
        <ul>
          {abridgedDirectors}
        </ul>

        <Modal show={this.state.editMode} onHide={this.cancelEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Director</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>Director</label>
              <input
                type="text"
                className="form-control"
                id="movieTitle"
                name="movieTitle"
                ng-model="ctrl.director"
                onChange={this.directorChanged}
                value={this.state.director}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-primary"
              onClick={this.addDirectorToMovie}
            >
              OK
            </button>
            <button
              className="btn btn-warning"
              onClick={this.cancelEdit}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

MovieDirectors.propTypes = {
  id: PropTypes.string.isRequired,
  abridgedDirectors: PropTypes.array.isRequired,
  addDirectorToMovie: PropTypes.func.isRequired,
};
