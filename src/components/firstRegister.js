'use strict';
import React from 'react';
import {Query} from "../query/query";
import { Redirect } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';

class RegisterAdmin extends React.Component {
    constructor(props) {
        super(props);
    }

    async createAdmin(){
        const data = {
            firstName: document.getElementById('fname').value,
            lastName: document.getElementById('lname').value,
            nickName: document.getElementById('nick').value,
            email: document.getElementById('email').value,
            password: sha256(document.getElementById('password').value).toString()
        };
        await Query.post('/adminCreate', data);
        window.open("/", "_self");
    };

    render() {
        return (
            <div className="App">
                <header className="App-header" >
                    Witam po raz pierwszy na stronie. Aby przejśc dalej wymagane jest stworzenie konta SuperAdmina.<br />
                    <div className="loginPanel">
                        <label htmlFor="firstName">Imie: </label>
                        <input type="text" id="fname" name="fname" />
                        <label htmlFor="lastName">Nazwisko: </label>
                        <input type="text" id="lname" name="lname" />
                        <label htmlFor="nick">Nick: </label>
                        <input type="text" id="nick" name="nick" />
                        <label htmlFor="email">Email: </label>
                        <input type="text" id="email" name="email" />
                        <label htmlFor="password">Hasło: </label>
                        <input type="password" id="password" name="lname" />

                        <button onClick={this.createAdmin} id="registerButton">Stwórz konto Admina </button>
                    </div>
                </header>
            </div>
        )
    }
}

export default RegisterAdmin;