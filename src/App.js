import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Query } from './query/query'
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import PrivateRoute from './components/privateRoute'
import PrivateRegister from './components/privateRegister'
import Login from './components/login';
import Home from '../src/components/home'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: null, err: [], isLoader: true};
    }

    componentDidMount() {
        new Promise((resolve, reject) => {
            resolve(Query.get('/isadmin'))
        })
        .then(response => response.text())
        .then(transform => {
            const value = JSON.parse(transform);
            this.setState({count: value});
        });
    }

    render() {
        if(this.state.count !== null) {
            return (
                <Router>
                    <Switch>
                        <PrivateRoute path='/dashboard' component={Home} />
                        <PrivateRegister path="/" component={Login} countAdmin={this.state.count} />
                    </Switch>
                </Router>
            )
        } else {
            return null
        }
    }
}


export default App;
