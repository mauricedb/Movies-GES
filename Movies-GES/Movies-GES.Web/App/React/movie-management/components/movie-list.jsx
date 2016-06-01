import React, {Component} from 'react';
import { Link  } from 'react-router';

export default class MovieList extends Component {
    render() {
        
        return (<div>
            In MovieList
            <hr/>
            <Link to="list">List</Link>
            &nbsp;
            <Link to="details/12345">Details</Link>
        </div>);
    }
}