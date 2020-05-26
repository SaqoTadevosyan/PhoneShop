import React, { Component } from "react";
import "./Login-module.scss";
import fire from "../../../backend/config";
import Shopingcart from "./ShopingCart/Shopingcart";
class Login extends Component {
  state = {
    user: false,
    toggle: false,
    userInfo:{},
    firstName:"",
      lastName:"",
      photo:""
    
  };
  toggleClick = () => {
     let newToggle=this.state.toggle
    this.setState({ toggle: !newToggle });
  };
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
     
      if (user) {
        this.setState({ user: true });
        
      this.userInfo()
       
      localStorage.setItem("user", user.uid);
        return;
      } else {
        this.setState({ user: false });
       
        localStorage.removeItem("user");
        return;
      }
    });
  }
  logOut = () => {
    fire.auth().signOut();
  };


userInfo=()=>{
  console.log("post")
  let uid=fire.auth().currentUser.uid
  fire.database().ref('/' + uid).once('value').then((snapshot)=> {
    let userInfo=JSON.stringify(snapshot.val())
    console.log(snapshot.val())
localStorage.setItem("user",userInfo)
    let lastNameGet = snapshot.val().lastname;
    let firstNameGet=snapshot.val().firstname
    let userphoto=snapshot.val().photo
    this.setState({lastName:lastNameGet})
    this.setState({firstName:firstNameGet})
    this.setState({photo:userphoto})
    
  });
}



  render() {
    if (!this.state.user) {
      return (
        <div className="login22">
          <a href="/login">Log in</a>
          <a href="/register">Sign Up</a>
          
        </div>
      );
    } else
      return (
       
          
<div className="container55">

  <div className="half">
    <label htmlFor="profile2" className="profile-dropdown">
      <input type="checkbox" id="profile2"></input>
      <img src={this.state.photo}></img>
      <span>{this.state.firstName+" "+this.state.lastName}</span>
      <label htmlFor="profile2"><i className="mdi mdi-menu"></i></label>
      <ul>
       
       
        <li><a href="/settings"><i className="mdi mdi-settings"></i>Settings</a></li>
        <li><a href="#" onClick={this.logOut}><i className="mdi mdi-logout"></i>Logout</a></li>
      </ul>
    </label>
  </div>
  <Shopingcart/> 
</div>




      );
  }
}

export default Login;
