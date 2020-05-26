import React, { useState } from "react";
import  { Component } from 'react';
import "./App.css";

import { BrowserRouter, Route, Switch, Redirect, } from "react-router-dom";
import Phone from "./Components/Product/PhonePage/Phone"
import Register from "./Components/Header/Register/Register"
import LoginPage from "./Components/Header/Login/LoginPage/LoginPage";
import Home from "./Components/Home/Home";
import Profile from "./Components/Header/Profile/Profile";
import Header from "./Components/Header/Header";
import Shop from "./Components/Shop/Shop";
import About from "./Components/About";
import CheckoutPage from "./Components/CheckoutPage/CheckoutPage";


class App extends Component {
  state = { 
    user:null
   }
   
  render() {
    
    
    return (
      
      <BrowserRouter>
    
    <Header/>
      <Switch>
        <Route path="/checkout" component={CheckoutPage}/> 
        <Route path="/About" component={About}/> 
        <Route
          path="/shop"
          exact
          component={Shop}
        />
        <Route
          path="/"
          exact
          component={Home}
        />
        <Route path="/login" component={LoginPage}/>
        <Route path="/settings" component={Profile}/>
        <Route path="/register" component={Register}/> 
        <Route path="/:id" component={Phone}/> 
      </Switch>
    </BrowserRouter>
    );
  }
}

export default App;