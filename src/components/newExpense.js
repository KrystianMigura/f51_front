import React from 'react'
import {Query} from "../query/query";

class NewExpense extends React.Component {

    // constructor(props) {
    //     super(props);
    // }
    async accountOperation(data, close) {
        const _id = data.props.value._id;
        const familyID = data.props.value.familyID;
        const closePopup = data.props.closePopup;
        const change = (document.getElementById('money')).value;
        const description = (document.getElementById('description')).value;
        const user = data.props.value.firstName + " " + data.props.value.lastName;

        await Query.put('/accountOperation', {_id, familyID, change, description, user});
        closePopup();

    }

    render() {
        return (
                <div className='popup_open'>
                    <div className="panel">
                        <button id="click" onClick={this.props.closePopup}>X</button>
                        <label htmlFor="money">Wprowadź wartość do zmiany na koncie. Aby odjąć dopisz na początku - </label>
                        <input type="number" id="money"  step="0.01"/>
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