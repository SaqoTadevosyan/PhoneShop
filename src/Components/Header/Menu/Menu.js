import {NavLink } from "react-router-dom";
import React, { Component } from 'react';
import  "./Menu-module.css"
class Menu extends Component {
  state = {};
  render() {
    return (
      <div className="menu" >
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/Shop">Shop</NavLink>
        <NavLink to="/About">About</NavLink>
        <NavLink to="/Contact">Contact</NavLink>
      </div>
    );
  }
}

export default Menu;
