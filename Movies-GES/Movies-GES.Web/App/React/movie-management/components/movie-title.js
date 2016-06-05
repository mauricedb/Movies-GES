import React, { Component, PropTypes } from 'react';

export default class MovieTitle extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      editMode: false,
    };


    this.toEditMode = () => {
      this.setState({
        editMode: true,
      });
    };

    this.cancelEdit = () => {
      this.setState({
        editMode: false,
        title: this.props.title,
      });
    };

    this.titleMovie = (e) => {
      e.preventDefault();

      this.props.titleMovie(this.props.id, this.state.title)
        .then(() => {
          this.setState({
            editMode: false,
          });
        });
    };

    this.titleChanged = (e) => {
      this.setState({
        title: e.target.value,
      });
    };
  }

  componentWillMount() {
    this.setState({
      title: this.props.title,
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      title: newProps.title,
    });
  }

  render() {
    let buttons;
    const { editMode, title } = this.state;

    if (editMode) {
      buttons = (<div>
        <button
          className="btn btn-xs btn-default pull-right"
          onClick={this.cancelEdit}
        >
          Cancel
        </button>
        <button
          className="btn btn-xs btn-default pull-right"
          onClick={this.titleMovie}
        >
          Save
        </button>
      </div>);
    } else {
      buttons = (<button
        className="btn btn-xs btn-default btn-edit pull-right"
        onClick={this.toEditMode}
      >
        Edit
      </button>);
    }

    return (
      <div>
        {buttons}
        <div className="form-group">
          <label
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            className="form-control"
            disabled={!editMode}
            onChange={this.titleChanged}
            value={title}
          />
        </div>
      </div>);
  }
}

MovieTitle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleMovie: PropTypes.func.isRequired,
};
