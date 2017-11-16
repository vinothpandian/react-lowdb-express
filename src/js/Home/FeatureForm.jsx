import React, {Component} from 'react';
import DictTable from "./DictTable";

class FeatureForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: []
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();

        let key = $("#key").val();
        let value = $("#value").val();

        if((!key || key=="") || (!value || value=="")) {
            alert("Fill all the fields please")
        } else {
            $.post('http://localhost:3000/', {
                key: key,
                value: value
            }).then(()=> {
                $.getJSON('http://localhost:3000/', (data) => {
                    this.setState({
                        data: data
                    })
                });
            });
        }
    }

    componentDidMount() {
        $.getJSON('http://localhost:3000/', (data) => {
            this.setState({
                data: data
            })
        });
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="key">Key</label>
                        <input type="text" className="form-control" id="key" aria-describedby="key" placeholder="Enter JSON Key" />
                        <small id="key" className="form-text text-muted">Let's enter the Key Value pair in JSON file using LowDB.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="value">Value</label>
                        <input type="text" className="form-control" id="value" placeholder="Enter Value of Key" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleClick}>Submit</button>
                </form>
                <DictTable data={this.state.data} />
            </div>
        );
    }
}

FeatureForm.propTypes = {};
FeatureForm.defaultProps = {};

export default FeatureForm;
