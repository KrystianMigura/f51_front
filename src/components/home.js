import React from 'react';
import {Query} from "../query/query";
import NewExpense from "./newExpense";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: this.props.value.user, isLoad: true, family: [], expenses: [], showPopup: false}
    }

    myExpenses() {
        new Promise((resolve, reject) => {
            resolve(Query.post('/expensesDetail',{"familyID": this.state.user.familyID, "nickName" : this.state.user.firstName + " " + this.state.user.lastName}))
        })
            .then(response => {
                if(response && !response.length)
                    response = [response];

                if(response[0].message === "Not Found")
                    response = [];

                this.setState({expenses: response } );
                return null;
            });
    }

    myFamilyExpenses() {
        new Promise((resolve, reject) => {
            resolve(Query.post('/expensesDetail',{"familyID": this.state.user.familyID}))
        })
        .then(response => {
            if(response && !response.length)
                response = [response];

            if(response[0].message === "Not Found")
                response = [];

            this.setState({expenses: response } );
            return null;
        });
    }

    myFamilyDetails () {
        new Promise((resolve, reject) => {
            resolve(Query.post('/familyDetails',{"_id": this.state.user.familyID}))
        })
            .then(response => response)
            .then(transform => {
                this.setState({family: transform});
                return null;
            });
    }


    componentDidMount() {

        // new Promise((resolve, reject) => {
        //     resolve(Query.post('/familyDetails',{"_id": this.state.user.familyID}))
        // })
        //     .then(response => response)
        //     .then(transform => {
        //         this.setState({family: transform});
        //
        //     });
        this.myFamilyDetails();
        this.setState({isLoad: !this.state.isLoad})
        this.myExpenses();
    }



    togglePopupMoney() {

        this.setState({
            showPopup: !this.state.showPopup
        });
    this.myFamilyDetails();
    this.myFamilyExpenses();
    this.myExpenses();
        // this.componentDidMount();

    }

    render() {
        console.log(this.state.isLoad , "<<<<<<<<< IS LOAD")
        if(!this.state.isLoad) {
            return (
                <div className="App">
                    <header className="App-Dashboard">
                        <div className="leftMenu">
                            <button className="menuButton button" onClick={() => {this.myExpenses()}}> Twoje wydatki</button>
                            <button className="menuButton button" onClick={() => {this.myFamilyExpenses()}}> Wydatki rodziny</button>
                            <button className="menuButton button" onClick={this.togglePopupMoney.bind(this)}> Dodaj wydatek</button>
                            {this.state.showPopup ?
                                <NewExpense
                                    text='X' value={this.state.user}
                                    closePopup={this.togglePopupMoney.bind(this)}
                                />
                                :
                                null
                            }
                            <button className="menuButton button"> Wyloguj</button>
                        </div>

                        <div className="panel" id="panel">
                            <div
                                className="title">Witaj {this.state.user.firstName} {this.state.user.lastName}</div>
                            <div className="titleSaldo">Dostępne Środki: {parseFloat(this.state.family.Money).toFixed(2)} zł</div>
                            <div className="body">
                                {!this.state.isLoad
                                    ?
                                    this.state.expenses.length < 1
                                    ?
                                        <div className="userExpanse">Nie wydałeś żadnych pieniędzy</div>
                                    :
                                    this.state.expenses.map((expense, index) => {
                                        return (<div className="singleElement" key={index}>
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
                    </header>
                </div>
            )
        } else {
            return "...loading ... 1111"
        }
    }
}

export default Home;