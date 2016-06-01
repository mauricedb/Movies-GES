import React, {Component} from 'react';

export default class App extends Component {
    render() {
        var {children} = this.props;
        return (<div>
            <h2>Movie Management using React</h2>
            <hr/>
            {children}
        </div>);
    }
}
