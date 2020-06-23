import React, { Component } from "react";
import "./LoginPage-module.scss";

import { withRouter } from "react-router-dom";
import fire from "../../../../backend/config"

class LoginPage extends Component {
  state = {
    
    wrongPassword:false,
    login: {
      status: false,
      email: "",
      password: "",
    },
  };
  
  
  
  
  signInButton = () => {
    console.log("sign in")
    
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.login.email, this.state.login.password)
      .then((u) => {this.props.history.push('/')
    })
      .catch(() => {
        this.setState({wrongPassword:true})
      });
  };
  
  
  loginChange = (event) => {
    let type = event.target.type;
    let value = event.target.value;
    let object = this.state.login;
 if(type==="email"){
  object.email = value;
  this.setState({ login: object });
 }
 if(type==="passsword"){
  object.password = value;
  this.setState({ login: object });
 }
  
    
  };
  render() {
    
    return (
      <div className="loginPage">
      <div className="container64">
      <div className="form">
        <div className="sign-in-section">
          
          <h1>Log in</h1>
          <ul>
            <li className="socialIcon"><img alt="a" src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png"></img></li>
            <li className="socialIcon"><img alt="a" src="https://clipartart.com/images/vk-icon-clipart.jpg"></img></li>
            <li className="socialIcon"><img alt="a" src="https://cdn0.iconfinder.com/data/icons/social-network-9/50/2-512.png"></img></li>
          </ul>
          <p>or use your email</p>
          
            <div className="form-field">
              <label for="email">Email</label>
              <input onChange={this.loginChange.bind(this)} id="email" type="email" placeholder="Email" />
            </div>
            <div className="form-field">
              <label for="password">Password</label>
              {this.state.wrongPassword ? <div className="wrongPassword"><h6>Wrong Password</h6></div>:null}
              <input onChange={this.loginChange.bind(this)} id="password" type="password" placeholder="Password" />
            </div>
            <div className="form-options">
              <div className="checkbox-field">
                <input id="rememberMe" type="checkbox" className="checkbox" />
                <label for="rememberMe">Remember Me</label>
              </div>
              <button href="#">Forgot Password?</button>
            </div>
            
            <div className="form-field">
              <button className="btn btn-signin" onClick={this.signInButton.bind(this)}>Sign In</button>
            </div>
         
          <div className="links">
            <button>Privacy Policy</button>
            <button>Terms & Conditions</button> 
          </div>
        </div>
      </div>
    </div>
    </div>
    );
  }
}

export default withRouter(LoginPage);
