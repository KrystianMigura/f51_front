
import React from 'react';
import {Query} from "./../query/query";
import ReactDOM from "react-dom";
import Myfamily from "./singleFamily";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {familyList: [], isLoad: true, test: 0}
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
    start = () => {
        window.location.reload();
    };

    signOut() {
        localStorage.clear();
        window.location.reload();
    }

    render() {
            return (
                <div className="App">
                    <header className="App-Dashboard">
                        <div className="leftMenu">
                            <button className="menuButton button" onClick={this.start}> Start</button>
                            <button className="menuButton button" onClick={this.signOut} > Wyloguj</button>
                        </div>
                        <div className="panel" id="panel">
                            {!this.state.isLoad
                                ?
                                this.state.familyList.map((name, index) => {
                                    return <div key={index} value={name._id} onClick={() => this.displaySelectedFamily(name._id)}>{name.FamilyName} <br /> {parseFloat(name.Money).toFixed(2)} zł</div>
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