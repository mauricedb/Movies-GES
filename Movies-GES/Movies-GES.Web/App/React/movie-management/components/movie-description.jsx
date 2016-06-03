import React, { Component, PropTypes } from 'react';

export default class MovieDescription extends Component {
    constructor() {
        super();
        this.state = {
            description: {
                synopsis: '',
                criticsConsensus:'',
                year:0,
                mpaaRating:''
            },
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
                description: this.props.description,
            });
        };

        this.updateDescription = () => {
            this.props.updateDescription(this.props.id, this.state.description)
                .then(() => {
                    this.setState({
                        editMode: false,
                    });
                });
        };

        this.synopsisChanged = (e) => {
            const description = {
                ...this.state.description,
                synopsis: e.target.value
            };

            this.setState({
                description,
            });
        };

        this.criticsConsensusChanged = (e) => {
            const description = {
                ...this.state.description,
                criticsConsensus: e.target.value
            };

            this.setState({
                description,
            });
        };

        this.yearChanged = (e) => {
            const description = {
                ...this.state.description,
                year: +e.target.value
            };

            this.setState({
                description,
            });
        };

        this.mpaaRatingChanged = (e) => {
            const description = {
                ...this.state.description,
                mpaaRating: e.target.value
            };

            this.setState({
                description,
            });
        };
    }

    componentDidMount() {
        this.setState({
            description: this.props.description,
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            description: newProps.description,
        });
    }

    render() {
        let buttons;
        const {editMode, description} = this.state;
        const {synopsis, criticsConsensus, year, mpaaRating} = description;

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
                    onClick={this.updateDescription}
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
                    <label>Synopsis</label>
                    <input
                        type="text"
                        className="form-control"
                        disabled={!editMode}
                        onChange={this.synopsisChanged}
                        value={synopsis || ''}
                    />
                </div>

                <div className="form-group">
                    <label>Critics Consensus</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={!editMode}
                      onChange={this.criticsConsensusChanged}
                      value={criticsConsensus || ''}
                    />
                </div>

                <div className="form-group">
                    <label>Year</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={!editMode}
                      onChange={this.yearChanged}
                      value={year || 0}
                    />
                </div>

                <div className="form-group">
                    <label>MPAA Rating</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={!editMode}
                      onChange={this.mpaaRatingChanged}
                      value={mpaaRating || ''}
                    />
                </div>

            </div>);
    }
}

MovieDescription.propTypes = {
    id: PropTypes.string.isRequired,
    description: PropTypes.object.isRequired,
    updateDescription: PropTypes.func.isRequired,
};



//    <div ng-controller="movie-description-controller">
//
//
//
//
//    </div>
