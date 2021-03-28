import React from 'react';
import { Query } from "./../query/query";
import sha256 from 'crypto-js/sha256';
import {NotificationContainer} from "react-notifications";
import {createNotification} from './notification'

class RegisterUser extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    async createUser(){
        const data = {
            firstName: document.getElementById('fname').value,
            lastName: document.getElementById('lname').value,
            nickName: document.getElementById('nick').value,
            email: document.getElementById('email').value,
            password: sha256(document.getElementById('password').value).toString(),
            accountType: "the_head_of_the_family"
        };

        const callback = await Query.post('/adminCreate', data);
        if(callback.valid){
            createNotification('emailValid');
            return null
        }


        window.open("/", "_self");
    };

    back() {
        window.open('/',"_self");
    }

    render() {
        return (
            <div className="App">
                <header className="App-header" >
                    Stwórz Głowę rodziny<br />
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

                        <button onClick={this.createUser} id="registerButton">Stwórz głowę rodziny</button><br />
                        <button onClick={this.back}>Powrót</button>
                    </div>
                </header>
                <NotificationContainer/>
            </div>
        )
    }
}

export default RegisterUser;