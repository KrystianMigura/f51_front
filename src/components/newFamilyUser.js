import React from 'react'
import sha256 from "crypto-js/sha256";
import {Query} from "../query/query";

class Popup extends React.Component {

    // constructor(props) {
    //     super(props);
    // }
    async createUser(value, close){
        const data = {
            firstName: document.getElementById('fname').value,
            lastName: document.getElementById('lname').value,
            nickName: document.getElementById('nick').value,
            email: document.getElementById('email').value,
            password: sha256(document.getElementById('password').value).toString(),
            accountType: "family_member",
            familyID: value.props.value._id
        };

        const closePopup = value.props.closePopup;

        await Query.post('/adminCreate', data);
        closePopup();

    };

    render() {
        return (
            <div className='popup'>
                <div className='popup_open'>
                    <div className="panel">
                    <button onClick={this.props.closePopup}>X</button>
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
                        <button onClick={() => {this.createUser(this, this.props.closePopup)}}>Stwórz</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Popup;