import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class MovieDetails extends Component {
    componentWillMount() {
    }


    render() {
        return (<div>
            In MovieDetails
            <hr />
            <Link to="list">List</Link>
        </div>);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        id: ownProps.params.id,
    };
}

export default connect(mapStateToProps)(MovieDetails);

