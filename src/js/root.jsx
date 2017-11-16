import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Nav from "./Home/Nav";
import Features from "./Home/Features";
import Home from "./Home/Home";

class Root extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Nav/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/features" component={Features}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Root;
