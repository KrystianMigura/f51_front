
import React from 'react';
import {Query} from "../query/query";
import ReactDOM from "react-dom";
import Myfamily from "./singleFamily";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {familyList: [], isLoad: true}
    }

    getFamilyList() {
        new Promise ((resolve, reject)=>
            {
                resolve(Query.get('/getFamily'))
            })
            .then(response => response.text())
            .then(transform => {
                transform = JSON.parse(transform)
                this.setState({familyList: transform});
                this.setState({isLoad: !this.state.isLoad})
            });
    }

    componentDidMount() {
        this.getFamilyList();
    }



    displaySelectedFamily(familyID) {
        if(familyID) {
            ReactDOM.render(<Myfamily _id={familyID} />, document.getElementById('panel'));
        }
    }

    render() {
            return (
                <div className="App">
                    <header className="App-Dashboard">
                        <div className="leftMenu">

                        </div>
                        <div className="panel" id="panel">
                            {!this.state.isLoad
                                ?
                                this.state.familyList.map((name, index) => {
                                    return <div key={index} value={name._id} onClick={() => this.displaySelectedFamily(name._id)}>{name.FamilyName} <br /> {name.Money} zł</div>
                                })
                                :
                                "Loading ..."
                            }
                        </div>
                    </header>
                </div>
            )
    }
}

export default Admin;