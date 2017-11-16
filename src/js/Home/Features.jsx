import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FeatureForm from "./FeatureForm";
import LocalStorageFeatureForm from "./LocalStorageFeatureForm";

class Features extends Component {
    render() {
        return (
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-auto">
                    <h1 className="display-1 text-danger">Features</h1>
                    <div className="card mt-5 p-5">
                        <div className="card-title">
                            <h3>Database storage with LowDB</h3>
                        </div>
                        <div className="card-body">
                            <LocalStorageFeatureForm/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Features.propTypes = {};
Features.defaultProps = {};

export default Features;
