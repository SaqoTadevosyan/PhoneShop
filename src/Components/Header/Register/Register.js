import React, { Component } from "react";
import "./style.scss";
import fire from "../../../backend/config";

class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    
    street: "",
    zipcode: "",
    city: "",
    country: "",
    number: "",
    photo: "",
    error: {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
    
      street: null,
      zipcode: null,
      city: null,
      country: null,
      number: null,
      photo: null,
    },
  };

  validTestAndSave = (event, type) => {
    let value = event.target.value;
    if (type === "name") {
      let err = this.state.error;
      err.firstname = "Please input firstname";
      if (value.length < 1) {
        this.setState({ error: err });
        return
      }
      err.firstname=true
      this.setState({ firstname: event.target.value });
      return
    }
    if (type === "lastname") {
      let err = this.state.error;
      if (value.length < 1) {
        err.lastname = "Please input lastname";
        if (value.length < 1) {
          this.setState({ error: err });
          return
        }
      }
      err.lastname=true
      this.setState({ lastname: event.target.value });
      console.log(event.target.value)
      return
    }
    if (type === "email") {
      let err = this.state.error;
        err.email = "Please input valid Email";
      if (
        /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
          event.target.value
        ) === false 
      ) {
        
        
          this.setState({ error: err });
          return
      }
        err.email=true
        this.setState({ email: event.target.value });
        console.log(event.target.value)
        return
    }

    if (type === "password") {
      let err = this.state.error;
      err.email = "Please input valid Password";
    if (
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
        event.target.value
      ) === false 
    ) {
      
      
        this.setState({ error: err });
        return
    }
      err.password=true
      this.setState({ email: event.target.value });
      console.log(event.target.value)
      return
    }
    if (type === "photo") {
      this.setState({ photo: event.target.value });
      console.log(event.target.value)
      return
    }
    
    if (type === "street") {
      let err = this.state.error;
      if (value.length < 1) {
        err.street = "Please input street";
        if (value.length < 1) {
          this.setState({ error: err });
          return
        }
      }
      err.street=true
      this.setState({ street: event.target.value });
      console.log(event.target.value)
      return
    }
    if (type === "zipcode") {
      let err = this.state.error;
      if (value.length < 1) {
        err.zipcode = "Please input zipcode";
        if (value.length < 1) {
          this.setState({ error: err });
          return
        }
      }
      err.lastname=true
      this.setState({ zipcode: event.target.value });
      console.log(event.target.value)
      return
    }
    if (type === "city") {
      let err = this.state.error;
      if (value.length < 1) {
        err.city = "Please input city";
        if (value.length < 1) {
          this.setState({ error: err });
          return
        }
      }
      err.city=true
      this.setState({ city: event.target.value });
      console.log(event.target.value)
      return
    }
    if (type === "country") {
      let err = this.state.error;
      if (value.length < 1) {
        err.country = "Please input country";
        if (value.length < 1) {
          this.setState({ error: err });
          return
        }
      }
      err.country=true
      this.setState({ country: event.target.value });
      console.log(event.target.value)
      return
    }
    if (type === "number") {
      let err = this.state.error;
      if (value.length < 1) {
        err.number = "Please input phone number";
        if (value.length < 1) {
          this.setState({ error: err });
          return
        }
      }
      err.number=true
      this.setState({ number: event.target.value });
      console.log(event.target.value)
      return
    }
  };

 
  createData = () => {
  
  if(this.state.error.firstname && this.state.error.lastname && this.state.error.email && this.state.error.password && this.state.error.street && this.state.error.zipcode && this.state.error.city && this.state.error.country && this.state.error.number){

    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        fire
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(this.props.history.push("/register"));
      })
      .then(() => [this.submit()]);
  }
  };

  submit(e) {
    console.log(this.state.photo);
    fire
      .database()
      .ref("/" + fire.auth().currentUser.uid)
      .set({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        photo: this.state.photo,
        number: this.state.number,
        street: this.state.street,
        zipcode: this.state.zipcode,
        city: this.state.city,
        country: this.state.country,
      })
      .then(this.props.history.push("/"));
  }

  render() {
    return (
      <div className="registerPage">
        <div className="page-content">
          <div className="form-v10-content">
            <div className="form-detail" id="myform">
              <div className="form-left">
                <h2>General Infomation</h2>
                <div classNameName="form-row">
                  <span className="select-btn">
                    <i className="zmdi zmdi-chevron-down"></i>
                  </span>
                </div>
                <div className="form-group">
                  <div className="form-row form-row-1">
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="input-text"
                      placeholder="First Name"
                      
                      onBlur={(e) => {
                        this.validTestAndSave(e, "name");
                      }}
                      required
                    ></input>
                    {this.state.error.firstname ? <span>{this.state.error.firstname}</span>:null}
                  </div>
                  <div className="form-row form-row-2">
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="input-text"
                      placeholder="Last Name"
                      
                      onBlur={(e) => {
                        this.validTestAndSave(e, "lastname");
                      }}
                      required
                    ></input>
                    {this.state.error.lastname ? <span>{this.state.error.lastname}</span>:null}
                  </div>
                </div>
                <div className="form-row form-row">
                  <input
                    type="text"
                    name="email"
                    id="first_name"
                    className="input-text"
                    placeholder="Email"
                   
                    onBlur={(e) => {
                      this.validTestAndSave(e, "email");
                    }}
                  ></input>
                  {this.state.error.email ? <span>{this.state.error.email}</span>:null}
                </div>
                <div className="form-row form-row">
                  <input
                    type="password"
                    name="password"
                    id="first_name"
                    className="input-text"
                    placeholder="Password"
                    onBlur={(e) => {
                      this.validTestAndSave(e, "password");
                    }}
                    required
                  ></input>
                  {this.state.error.password ? <span>{this.state.error.password}</span>:null}
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="photo"
                    id="photo"
                    className="input-text"
                    required
                    placeholder="Your photo"
                    onBlur={(e) => {
                      this.validTestAndSave(e, "photo");
                    }}
                  ></input>
                </div>
                
              </div>

              <div className="form-right">
                <h2>Contact Details</h2>
                <div className="form-row">
                  <input
                    type="text"
                    name="street"
                    className="street"
                    id="street"
                    placeholder="Street + Nr"
                    onBlur={(e) => {
                      this.validTestAndSave(e, "street");
                    }}
                    required
                  ></input>
                  {this.state.error.street ? <span>{this.state.error.street}</span>:null}
                </div>

                <div className="form-group">
                  <div className="form-row form-row-1">
                    <input
                      type="text"
                      name="zip"
                      className="zip"
                      id="zip"
                      placeholder="Zip Code"
                      onBlur={(e) => {
                        this.validTestAndSave(e, "zipcode");
                      }}
                      required
                    ></input>
                      {this.state.error.zipcode ? <span>{this.state.error.zipcode}</span>:null}
                  </div>
                  <div className="form-row form-row-1">
                    <input
                      type="text"
                      name="City"
                      className="code"
                      id="City"
                      placeholder="City"
                      onBlur={(e) => {
                        this.validTestAndSave(e, "city");
                      }}
                      required
                    ></input>
                    {this.state.error.city ? <span>{this.state.error.city}</span>:null}
                    
                  </div>
                </div>
                <div className="form-row">
                <input
                      type="text"
                      name="country"
                      className="code"
                      id="country"
                      placeholder="Country"
                      onBlur={(e) => {
                        this.validTestAndSave(e, "country");
                      }}
                      required
                    ></input>
                    {this.state.error.country ? <span>{this.state.error.country}</span>:null}
                    
                 
                </div>
                <div className="form-group">
                  <div className="form-row form-row-1">
                    <input
                      type="text"
                      name="code"
                      className="code"
                      id="code"
                      placeholder="Code +"
                      required
                    ></input>
                     
                  </div>
                  <div className="form-row form-row-1">
                    <input
                      type="text"
                      name="number"
                      className="phone"
                      id="phone"
                      placeholder="Phone Number"
                      onBlur={(e) => {
                        this.validTestAndSave(e, "number");
                      }}
                      required
                    ></input>
                      {this.state.error.number ? <span>{this.state.error.number}</span>:null}
                  </div>
                </div>

                <div className="form-checkbox">
                  <label className="container">
                    <p>
                      I do accept the{" "}
                      <a href="" className="text">
                        Terms and Conditions
                      </a>{" "}
                      of your site.
                    </p>
                    <input type="checkbox" name="checkbox"></input>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="form-row-last">
                  <input
                    onClick={() => {
                      this.createData();
                    }}
                    name="register"
                    type="submit"
                    className="register"
                    value="Register Badge"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
