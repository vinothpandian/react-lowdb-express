import React, {Component} from 'react';
const xIcon = require('../../assets/close.png');

const low = require('lowdb');
const LocalStorage = require('lowdb/adapters/LocalStorage');
const adapter = new LocalStorage('db');
const db = low(adapter);

db.defaults({ dictionary: [] })
    .write();

class FeatureForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        event.preventDefault();

        const id = event.target.id.split('button')[1];

        console.log(db.get('dictionary').value());

        console.log(id);

        db.get('dictionary').remove({
            id: id
        }).write();

        this.setState({
            data: db.get('dictionary').value()
        })

    }

    handleSubmit(event) {
        event.preventDefault();

        let key = $("#key").val();
        let value = $("#value").val();

        if((!key || key=="") || (!value || value=="")) {
            alert("Fill all the fields please")
        } else {
            db.get('dictionary')
                .push({
                    id: Date.now().toString(),
                    key : key,
                    value: value
                })
                .write();

            this.setState({
                data: db.get('dictionary').value()
            })
        }
    }

    componentDidMount() {

        this.setState({
            data: db.get('dictionary').value()
        })

    }


    render() {

        const tableRows = this.state.data.map((data, i) => {
            const index = data.id;

            return <tr key={"row"+(i+1)} className="justify-content-center">
                <th scope="row">{i+1}</th>
                <td id={"key"+index}>{data.key}</td>
                <td id={"value"+index}>{data.value}</td>
                <td><input id={"button"+index} type="image" src={xIcon} width="24" onClick={this.handleDelete}/></td>
            </tr>
        });

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
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                </form>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Key</th>
                        <th scope="col">Value</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

FeatureForm.propTypes = {};
FeatureForm.defaultProps = {};

export default FeatureForm;
