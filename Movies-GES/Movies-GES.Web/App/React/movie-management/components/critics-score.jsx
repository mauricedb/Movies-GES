import React, { Component, PropTypes } from 'react';

import { Modal, OverlayTrigger } from 'react-bootstrap';

export default class CriticsScore extends Component {

    constructor() {
        super();

        this.state = {
            score: 0,
            editMode: false,
        };

        this.scoreChanged = (e) => {
            this.setState({
                score: +e.target.value,
            });

        };

        this.toEditMode = () => {
            this.setState({
                editMode: true
            });
        };

        this.cancelEdit = () => {
            this.setState({
                score: this.props.score,
                editMode: false,
            });
        };

        this.updateScore = () => {
            this.props.updateScore(this.props.id, this.state.score)
                .then(() => {
                    this.setState({
                        editMode: false,
                    });
                });
        };

    }

    componentDidMount() {
        this.setState({
            score: this.props.score,
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            score: newProps.score,
        });
    }

    render() {
        return (
            <div className="form-group">
                <label for="criticsScore">{this.props.label}</label>
                &nbsp;{this.props.score}&nbsp;
                <button
                    className="btn btn-xs"
                    onClick={this.toEditMode}
                >
                    Score
                </button>

                <Modal show={this.state.editMode} onHide={this.cancelEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rate Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Rating</label>
                            <input
                                type="range"
                                className="form-control"
                                onChange={this.scoreChanged}
                                value={this.state.score}
                                min="0"
                                max="100"
                            />
                            Rating: {this.state.score} out of 100
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="btn btn-primary"
                            onClick={this.updateScore}
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
