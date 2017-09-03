import React, {Component} from 'react';
import AccountsUIWrapperHome from './AccountsUIWrapperHome.jsx';
import { Route } from 'react-router-dom'
import * as firebase from 'firebase'

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.up = false;
    }


    login(history) {
        console.log("HOLAAAAAAAAA");
        console.log(this.state);
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(function (snapshot) {
                console.log(snapshot);
                     history.push('/concursos')
            }, function (error) {
                // Handle Errors here
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert("Wrong Password");
                } else {
                    alert(errorMessage);
                }

            });
    }

    render() {

        const Button = () => {
            console.log("HHHHH");
            return <Route render={({history}) => (
                <button id="button"
                    type='button'
                    onClick={() => {
                        this.login(history)

                    }}
                >
                    SignIn
                </button>
            )}/>
        }
        return (
            <div className="text-center  ">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 text-center">
                        <h1 >Welcome to Smart </h1>
                        <h2> Smart Tools es una pagina web que le permite publicar consursos de video y participar en
                            los mismos </h2>
                        <h2> Para crear concursos registrate o haz login </h2>
                        <h2>Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum</h2>
                        <h2>Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum</h2>
                        <h2>Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum</h2>
                        <h2>Loren Ipsum Loren Ipsum oren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum</h2>
                        { /*<AccountsUIWrapperHome/>*/}
                    </div>
                    <div className="bajar row col-md-3">
                        <div>
                            <div className="loginform">
                                <div>
                                    <label><b>Email</b></label>
                                    <input id="sinput" type="text" placeholder="Enter Email"
                                           onChange={(event)=>{
                                               this.setState({
                                                   email:event.target.value,
                                               })
                                           }} required/>

                                    <label><b>Password</b></label>
                                    <input id="sinput" type="password" placeholder="Enter Password"
                                           onChange={(event)=>{
                                               this.setState({
                                                   password:event.target.value,
                                               })
                                           }} required/>
                                    <div className="row">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-3">
                                            <AccountsUIWrapperHome/>
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                Button()
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Home;
