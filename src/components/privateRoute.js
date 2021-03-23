import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Query} from "../query/query";
import  Home  from "../components/home"

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: {}, isLoad: true}
    }

    componentDidMount() {
        new Promise((resolve, reject) => {
            resolve(Query.get('/dashboard'))
        })
            .then(response => response.text())
            .then(transform => {
                const value = JSON.parse(transform);
                this.setState({user: value});
                this.setState({isLoad: !this.state.isLoad})
            });
    }

    render(){
        if(!this.state.isLoad) {
            return(
                <Route
                    render={ () => (
                        this.state.user.error ? <Redirect to='/'/> : this.state.user.user.accountType === "SuperAdmin"
                        ?
                        <div>Super Admin</div>
                        :
                        <Home />
                    )}
                />
            )
        } else {
            return null
        }
    }
}



export default PrivateRoute

