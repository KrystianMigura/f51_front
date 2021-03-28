
import React from 'react';
import { Query } from "./../query/query";
import Popup from "./newFamilyUser";
import PopupMoney from "./moneyValue"
import { userEnum } from './enums';

class Myfamily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expenses: [], family: [], user: [], isLoad: true, _id: props.id, showPopup: false, showPopupMoney: false }
    }

    componentDidMount() {

        new Promise((resolve, reject) => {
            resolve(Query.post('/familyDetails',{"_id": this.props._id}))
        })
        .then(response => response)
        .then(transform => {
            this.setState({user: transform});
        });

        new Promise((resolve, reject) => {
            resolve(Query.post('/expensesDetail',{"familyID": this.props._id}))
        })
        .then(response => {
            if(response && !response.length)
                response = [response];

                this.setState({expenses: response } );
        });


        new Promise((resolve, reject) => {
            resolve(Query.post('/myFamily', {"familyID": this.props._id}))
        })
            .then(response => {
                if(response && !response.length)
                    response = [response];

                this.setState({family: response } );
                this.setState({isLoad: !this.state.isLoad})
            })
    }


    togglePopup() {

        this.componentDidMount();
        this.setState({isLoad: !this.state.isLoad});


        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    togglePopupMoney() {
        this.setState({user: []});
        this.setState({
            showPopupMoney: !this.state.showPopupMoney
        });

        this.componentDidMount();
        this.setState({isLoad: !this.state.isLoad});
    }


    render() {
        if(!this.state.isLoad){
            return(
                <div className="family" >
                    <div className="familyChildren">Rodzina : {this.state.user.FamilyName} </div>
                    <div className="familyChildren">Saldo : {parseFloat(this.state.user.Money).toFixed(2)} zł</div>
                    <button onClick={this.togglePopup.bind(this)}> Dodaj Członka rodziny</button>
                    {this.state.showPopup ?
                        <Popup
                            text='X' value={this.state.user}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                <button onClick={this.togglePopupMoney.bind(this)}>Zmień Saldo</button>
                    {this.state.showPopupMoney ?
                        <PopupMoney
                            text='X' value={this.state.user}
                            closePopup={this.togglePopupMoney.bind(this)}
                        />
                        : null
                    }
                    <div className="familyList">
                        {!this.state.isLoad
                            ?
                            this.state.family.map((name, index) => {
                                return <div key={index}>{name.firstName} <br /> {name.email} <br /> {userEnum[`${name.accountType}`]} </div>
                            })
                            :
                            null
                        }
                    </div>
                    <div className="familyExpenses">
                        {!this.state.isLoad
                            ?
                            this.state.expenses.map((expense, index) => {
                                return (<div className="expense" key={index}>
                                    <div>{expense.nickName}</div>
                                    <div>{expense.date}</div>
                                    <div>{expense.price}</div>
                                    <div>{expense.details}</div>
                                </div>)
                            })
                            :
                            null
                        }
                    </div>
                </div>

            )
        }else {
            return "...loading ..."
        }
    }
}

export default Myfamily;