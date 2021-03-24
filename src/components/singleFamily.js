
import React from 'react';
import {Query} from "../query/query";


class Myfamily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {family: [], user: [], isLoad: true, _id: props.id}
    }

    componentDidMount() {
        new Promise((resolve, reject) => {
            resolve(Query.post('/familyDetails',{"_id": this.props._id}))
        })
            .then(response => response)
            .then(transform => {
                console.log(transform, "<<<<<<<<< TRANSFORM!!!!!!!")
                this.setState({user: transform});
                this.setState({isLoad: !this.state.isLoad})
            });
    }

    render() {
        if(!this.state.isLoad){
            return(
                <familyInfo >
                    <span>Rodzina : {this.state.user.FamilyName} </span>
                    <span> || </span>
                    <span>Dostępne środki: {this.state.user.Money} zł</span>
                </familyInfo>

            )
        }else {
            return "...loading ..."
        }
    }
}

// const myFamily = async() => {
//     return (<div>asdfasdfasdfasdfasdf</div>)
// }
// function myFamily(family) {
//
//     async function test(){
//         let b = await Query.get('/getFamily');
//         console.log(b);
//         return b;
//     }
//
//     const z = new Promise((resolve, reject) => {
//         resolve(test())
//     });
//
//     console.log(z ,"<<<<<<< Z")
//
//
//     // console.log(family , "<<<<<")
//     //
//     // const a =new Promise((resolve, reject) => {
//     //     resolve(Query.get('/getFamily'))
//     // })
//     //     .then(response => response.text())
//     //     .then(transform => {
//     //         transform = JSON.parse(transform)
//     //         return transform;
//     //     });
//     //
//     //  a.then(elem => {b = elem[0]})
//     // const buk = setTimeout(()=> {
//     //     console.log(b)
//     //     return <div>asdfasfasdf</div>
//     // },500)
//     //
//     // console.log(buk)
//
// }



export default Myfamily;