import React, { Component, PropTypes } from 'react';

export default class MovieDescription extends Component {
    constructor() {
        super();
        this.state = {
            description: {
                synopsis: ''
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
        const {synopsis} = description;

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
                    <label htmlFor="synopsis">Synopsis</label>
                    <input
                        type="text"
                        className="form-control"
                        id="synopsis"
                        ng-model="ctrl.movie.synopsis"
                        disabled={!editMode}
                        onChange={this.synopsisChanged}
                        value={synopsis}
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
