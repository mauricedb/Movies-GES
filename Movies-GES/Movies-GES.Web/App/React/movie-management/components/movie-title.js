import React, { Component } from 'react';

export default class MovieTitle extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            editMode: true,
        };


        this.toEditMode = () => {
            this.setState({
                editMode: true
            });
        };

        this.cancelEdit = () => {
            this.setState({
                editMode: false,
                title: this.props.title,
            });
        };

        this.updateTitle = () => {
            this.props.updateTitle(this.props.id, this.state.title)
                .then(() => {
                    this.setState({
                        editMode: false,
                    });
                })
        };

        this.titleChanged = (e) => {
            this.setState({
                title: e.target.value,
            });
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            title: newProps.title,
        });
    }

    render() {
        var buttons;
        if (this.state.editMode) {
            buttons = <div>
                <button className="btn btn-xs btn-default pull-right"
                        onClick={this.cancelEdit}>
                    Cancel
                </button>
                <button className="btn btn-xs btn-default pull-right"
                        onClick={this.updateTitle}>
                    Save
                </button>
            </div>
        } else {
            buttons = <button className="btn btn-xs btn-default btn-edit pull-right"
                        onClick={this.toEditMode}>
                    Edit
                </button>;

        }

        return (
            <div>
                {buttons}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text"
                           className="form-control"
                           disabled={!this.state.editMode}
                           onChange={this.titleChanged}
                           value={this.state.title}
                    />
                </div>
            </div>);
    }
}

