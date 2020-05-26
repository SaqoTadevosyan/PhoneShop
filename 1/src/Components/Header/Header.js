import React, { Component } from 'react';
import Menu from './Menu/Menu';
import Login from './Login/Login';
import headerStyle from "./Header-module.css"
class Header extends Component {
    state = {  }
    render() {
        return (
            <div className="header33">
                <h3 className="logo">Logo</h3>
                <Menu/>
                <Login/>
            </div>
        );
    }
}

export default Header;