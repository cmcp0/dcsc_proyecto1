import React, {Component} from 'react';
import Header from './Header.jsx'
import Main from './Main.jsx'
// import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    openProfileModal() {
        return;
    }


    render() {
        return (
            <div >
                <Header/>
                <Main/>
            </ div >
        )
    };
}
export default App;
