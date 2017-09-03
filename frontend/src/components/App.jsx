import React, {Component} from 'react';
import Header from './Header.jsx'
import Main from './Main.jsx'
// import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import * as firebase from 'firebase'
import UidProvider from './UidProvider.js';

const config = {
    apiKey: "AIzaSyAjajgN45i-QBA5L3oZoOe6caMv9wKGB2E",
    authDomain: "smarttools-jscardona12.firebaseapp.com",
    databaseURL: "https://smarttools-jscardona12.firebaseio.com",
    projectId: "smarttools-jscardona12",
    storageBucket: "smarttools-jscardona12.appspot.com",
    messagingSenderId: "948114200644"
};
firebase.initializeApp(config);
export const auth = firebase.auth(); //the firebase auth namespace

export const storageKey = 'user';

export const isAuthenticated = () => {
    return !!auth.currentUser || !!localStorage.getItem(storageKey);
}

 class App extends Component {
     state = {
         uid: null
     }


     static childContextTypes = {
         uid: React.PropTypes.string
     }
     getChildContext() {
         return this.state.uid?{uid: this.state.uid}:{uid: localStorage.getItem(storageKey)};
     }

    componentDidMount() {
            auth.onAuthStateChanged(user => {
                if (user) {
                    window.localStorage.setItem(storageKey, user.uid);
                    this.setState({uid: user.uid});
                } else {
                    window.localStorage.removeItem(storageKey);
                    this.setState({uid: null});
                }
            });
    }



    render() {
        console.log(this.state.uid)
        return (
            <UidProvider>
                {(uid) => (
                    <div >
                        <Header user={uid} />
                        <Main user={uid}/>
                    </ div >
                )}
            </UidProvider>

        )
    };
}
export default App;
