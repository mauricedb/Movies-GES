import React, { PropTypes } from 'react';

const App = (props) => {
    const { children } = props;
    return (<div>
        <h2>Movie Management using React</h2>
        <hr />
        {children}
    </div>);
};

App.propTypes = {
    children: PropTypes.array.isRequired,
};

export default App;
