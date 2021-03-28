
import React from 'react';
import { Query } from "./../query/query";
import sha256 from 'crypto-js/sha256';
import ReactDOM from "react-dom";
import RegisterUser from "./registerUser";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import {createNotification} from './notification'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0, isLoader: true};
    }

    async login() {
        const nick = document.getElementById('username').value;
        const pass = (document.getElementById('password').value !== "") ?sha256(document.getElementById('password').value).toString(): "";

        if(nick === "" || pass === ""){
            createNotification('info');
            return null;
        }

        const data = await Query.post('/login', {username: nick, password: pass});
        if(data.message ===  "Unauthorized") {
            createNotification('Unauthorized');
            return null;
        }

        localStorage.setItem('token', data.token)
        if(localStorage.getItem('token') !== undefined) {
            window.open('/dashboard', "_self")
        }
    }

    async register() {
        ReactDOM.render(
            <React.StrictMode>
                <RegisterUser />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div className="App">
                <header className="App-header" >
                    <div className="loginPanel">
                        <label htmlFor="username">Login: </label>
                        <input type="text" id="username" name="fname" /><br /><br />
                        <label htmlFor="password">Hasło: </label>
                        <input type="password" id="password" name="lname" /><br /><br />
                        <button id="submitButton" onClick={this.login} >Logowanie</button>
                        <button id="registerButton" onClick={this.register}>Rejestracja</button>
                    </div>
                </header>
                <NotificationContainer/>
            </div>

        )
    }
}

export default Login;