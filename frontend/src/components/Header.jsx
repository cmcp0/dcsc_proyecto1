import React, {Component} from 'react';
// import AccountsUIWrapperHome from './AccountsUIWrapperHome.jsx';
import {NavLink, Route} from 'react-router-dom'
import * as firebase from 'firebase';
import UidProvider from './UidProvider.js';


export default class Header extends Component {

    singOut() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("signout");

        }, function (error) {
            // An error happened.
        })
        this.forceUpdate();

    }


    render() {


        const Button = () => {
            return <Route render={({history}) => (
                <li><a href="/" id="navbar-list" onClick={
                    firebase.auth().signOut().then(function () {
                        // Sign-out successful.
                        console.log("signout");
                        history.push('/')
                    }, function (error) {
                        // An error happened.
                    })
                }>Sign Out</a></li>


            )}/>
        }
        return (
            <nav id="navbar" className="navbar navbar-light navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <NavLink to="/" id="navbar-brand" className="navbar-brand" activeClassName="selected">
                            <img
                                className="logo"
                                src="logo3.png"
                                alt="logo"/>
                        </NavLink>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            {this.props.user ?

                                <li><a href="/" id="navbar-list" onClick={this.singOut.bind(this)}>Sign Out</a></li>:
                                <div></div>
                            }
                            {this.props.user ?
                                <li><NavLink id="navbar-list" to="/concursos"
                                             activeClassName="selected">Concursos</NavLink>
                                </li>
                                : <div></div>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

}

