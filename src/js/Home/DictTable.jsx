import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DictTable extends Component {
    render() {

        const tableRows = this.props.data.map((data, index) => {
            return <tr key={"row"+index}>
                <th scope="row">{index+1}</th>
                <td>{data.key}</td>
                <td>{data.value}</td>
            </tr>
        });

        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Key</th>
                    <th scope="col">Value</th>
                </tr>
                </thead>
                <tbody>
                {tableRows}
                </tbody>
            </table>
        );
    }
}

DictTable.propTypes = {};
DictTable.defaultProps = {};

export default DictTable;
