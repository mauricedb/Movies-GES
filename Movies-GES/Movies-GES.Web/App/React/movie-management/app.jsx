import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class App extends Component {
    render() {
        return <div>Hi from React</div>;
    }
}


ReactDOM.render(<App/>, 
    document.getElementById('app'));
