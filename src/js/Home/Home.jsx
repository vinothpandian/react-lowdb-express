import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Home extends Component {
    render() {
        return (
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-auto text-center">
                    <h1 className="display-1">React</h1>
                    <p className="lead">with Webpack, Bootstrap, LowDB and Express</p>
                </div>
            </div>
        );
    }
}

Home.propTypes = {};
Home.defaultProps = {};

export default Home;
