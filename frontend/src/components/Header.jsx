import React, {Component} from 'react';
// import AccountsUIWrapperHome from './AccountsUIWrapperHome.jsx';
import { NavLink } from 'react-router-dom'

class Header extends Component {


    render() {

        return (
            <nav id ="navbar" className="navbar navbar-light navbar-fixed-top" role="navigation">
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
                                src="/images/logo1.png"
                                alt="logo"/>
                        </NavLink>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            {/*<li><AccountsUIWrapper/></li>*/}
                            <li><NavLink id="navbar-list" to="/concursos" activeClassName="selected">Concursos</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
