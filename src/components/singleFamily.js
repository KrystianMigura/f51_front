
import React from 'react';
import {Query} from "../query/query";
import Popup from "./newFamilyUser";

class Myfamily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {family: [], user: [], isLoad: true, _id: props.id, showPopup: false }
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
            resolve(Query.post('/myFamily', {"familyID": this.props._id}))
        })
            .then(response => {
                if(response && !response.length)
                    response = [response]

                this.setState({family: response } );
                this.setState({isLoad: !this.state.isLoad})
            })
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }


    render() {
        if(!this.state.isLoad){
            return(
                <div className="family" >
                    <div className="familyChildren">Rodzina : {this.state.user.FamilyName} </div>
                    <div className="familyChildren">Saldo : {this.state.user.Money} zł</div>
                    <button onClick={this.togglePopup.bind(this)}> Dodaj Członka rodziny</button>
                    {this.state.showPopup ?
                        <Popup
                            text='X' value={this.state.user}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                <button>Zmień Saldo</button>
                    <div className="familyList">
                        {!this.state.isLoad
                            ?
                            this.state.family.map((name, index) => {
                                return <div style={{"font-size": "12px"}} key={index}>{name.firstName} <br /> {name.email} <br /> {name.accountType} </div>
                            })
                            // this.state.familyList.map((name, index) => {
                            //     return <div key={index} value={name._id} onClick={() => this.displaySelectedFamily(name._id)}>{name.FamilyName} <br /> {name.Money} zł</div>
                            // })
                            :
                            "Loading ..."
                        }

                        {/*<div className="element">1</div>*/}
                        {/*<div className="element">2</div>*/}
                        {/*<div className="element">3</div>*/}
                    </div>
                    <div className="familyExpenses">
                        <div className="expense">nułki</div>
                        <div className="expense">chleb</div>
                        <div className="expense">....</div>
                        <div className="expense">cos tam</div>
                    </div>
                </div>

            )
        }else {
            return "...loading ..."
        }
    }
}

export default Myfamily;