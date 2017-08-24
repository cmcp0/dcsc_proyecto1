import React, {Component} from 'react';
// import AccountsUIWrapperHome from './AccountsUIWrapperHome.jsx';

class Home extends Component {


    render() {

        return (
            <div className="text-center container">
                <div className="col-md-3"></div>
                <div className="col-md-6 text-center">
                    <h1 >Welcome to Smart </h1>
                    <h2> Smart is a web site where you can subscribe to job offers, or publish job
                        offers </h2>
                    <h2> To use Job Marketplace, please Login </h2>
                    {/*<AccountsUIWrapperHome/>*/}

                </div>
            </div>

        );
    }
}

export default Home;
