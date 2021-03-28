import React from 'react'
import { Query } from "./../query/query";
import {createNotification} from './notification'

class NewExpense extends React.Component {

    // constructor(props) {
    //     super(props);
    // }
    async accountOperation(data, close) {
        const _id = data.props.value._id;
        const familyID = data.props.value.familyID;
        const closePopup = data.props.closePopup;
        const change = "-" + ((document.getElementById('money')).value).replace("-","");
        const description = (document.getElementById('description')).value;
        const user = data.props.value.firstName + " " + data.props.value.lastName;

        const response = await Query.put('/accountOperation', {_id, familyID, change, description, user});

        closePopup();
        if(response === false) {
            createNotification('noMoney')
        } else {
            createNotification('addExpense')
        }


    }

    render() {
        return (
                <div className='popup_open'>
                    <div className="panel">
                        <button id="click" onClick={this.props.closePopup}>X</button>
                        <label htmlFor="money">Wprowadź kwotę </label>
                        <input type="number" id="money"  step="0.01" min="0.01"/>
                        <label htmlFor="description">Szczegóły dotyczące wydatku. </label>
                        <input type="text" id="description"/>
                        <button onClick={() => {this.accountOperation(this)}}>Zatwierdź</button>
                    </div>

                </div>
            // </div>
        );
    }
}
export default NewExpense;