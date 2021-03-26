import React from 'react'
import sha256 from "crypto-js/sha256";
import {Query} from "../query/query";

class PopupMoney extends React.Component {

    constructor(props) {
        super(props);
    }

    async accountOperation(data, close) {
        const familyID = data.props.value._id;
        const closePopup = data.props.closePopup;
        const change = (document.getElementById('money')).value;

        await Query.put('/accountOperation', {familyID, change})
        closePopup();

    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_open'>
                    <div className="panel">
                        <button id="click" onClick={this.props.closePopup}>X</button>
                        <label htmlFor="money">Wprowadź wartość do zmiany na koncie. Aby odjąć dopisz na początku - </label>
                        <input type="number" id="money"  step="0.01"/>
                        <button onClick={() => {this.accountOperation(this)}}>Zatwierdź</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default PopupMoney;