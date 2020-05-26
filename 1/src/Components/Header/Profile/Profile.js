import React, { Component } from "react";
import ProfileStyle from "./Profile.module.scss";
import fire from "../../../backend/config";
import avatarStyle from "./avatar.module.css"
import cardStyle from "./card.module.css"
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openTab: 0,
      profile: true,
      payment: false,
      
      settings: false,
      lastname:"",
      firstname:"",
      email:"",
      photo:"",
      Zipcode:"",
      street:"",
      PhoneNumber:"",
      newLastname:"",
      newFirstname:"",
      newEmail:"",
      newPhoto:"",
      newZipcode:"",
      newStreet:"",
      newPhoneNumber:"",
    };
   
  }
componentDidMount(){
  fire.auth().onAuthStateChanged(user=>{
    if(user){
      this.userInfo()
    }else{
      console.log("aaaaaaaaa")
    }
  })
}
  userInfo=()=>{
  
    let uid=fire.auth().currentUser.uid
    fire.database().ref('/' + uid).once('value').then((snapshot)=> {
  
      let lastName = snapshot.val().lastname ;
      this.setState({lastname:lastName})
      let firstName = snapshot.val().firstname ;
      this.setState({firstname:firstName})
      let userphoto=snapshot.val().photo
      this.setState({photo:userphoto})
      let eMail = snapshot.val().email ;
      this.setState({email:eMail})
      let photoUrl = snapshot.val().photo ;
      this.setState({photo:photoUrl})
      let zip = snapshot.val().zipcode ;
      this.setState({Zipcode:zip})
      let str = snapshot.val().street ;
      this.setState({street:str})
      let phone = snapshot.val().number ;
      this.setState({PhoneNumber:phone})
      
    });}

  navClick = (event) => {
    let name = event.target.name;
console.log(name)
if(name=="profile"){
  this.setState({
    profile: true,
    payment: false,
   
    settings: false,
    change:false,
  });
}
  

     if(name=="payment"){
       this.setState({
          profile: false,
          payment: true,
         
          settings: false,
          change:false,
        });}
      if(name=="subscription"){
        this.setState({
          profile: false,
          payment: false,
          
          settings: false,
          change:false,
        });}

        if(name=="privacy"){
        this.setState({
          profile: false,
          payment: false,
          
          settings: false,
          change:false,
        });}
        if(name=="settings"){
        this.setState({
          profile: false,
          payment: false,
         
          settings: true,
          change:false,
        });
    }
    console.log(this.state)
  };

  handleChange=(event)=>{
    
    if(event.target.name=="firstName"){
      this.setState({newFirstname:event.target.value})
    }
    if(event.target.name=="lastName"){
      this.setState({newLastname:event.target.value})
    }
    if(event.target.name=="phoneNumber"){
      this.setState({newPhoneNumber:event.target.value})
    }
    if(event.target.name=="zipCode"){
      this.setState({newZipcode:event.target.value})
    }
    if(event.target.name=="street"){
      this.setState({newStreet:event.target.value})
    }
  }
  saveInfo=()=>{
    
    fire.database().ref("/"+fire.auth().currentUser.uid).update({
      
      firstname:this.state.newFirstname,
      lastname:this.state.newLastname,
      number:this.state.newPhoneNumber,
      street:this.state.newStreet,
      zipcode:this.state.newZipcode,
    })
  }
  render() {
    

    return (
      <div className={ProfileStyle.container}>
        <div id="logo">
          
          
        </div>
        <div className={ProfileStyle.leftbox}>
          <nav className={ProfileStyle.nav}>
            <a
              name="profile"
              onClick={this.navClick.bind(this)}
              className={ ProfileStyle.active}
            >
              <i className="fa fa-user"></i>
            </a>
            <a name="payment" onClick={this.navClick.bind(this)}>
              <i className="fa fa-credit-card"></i>
            </a>
          
            <a name="settings" onClick={this.navClick.bind(this)}>
              <i className="fa fa-cog"></i>
            </a>
          </nav>
        </div>
        <div className={ProfileStyle.rightbox}>
          <div className={this.state.profile ?  ProfileStyle.profile:ProfileStyle.noshow}>
          
          
    
  <div className={avatarStyle.profile_pic} >
      <span className={(avatarStyle.glyphicon, avatarStyle.glyphicon_camera)} ></span>
      <img className={avatarStyle.profile_pic} src={this.state.photo}></img>
     
  </div>
  
  
  
            <h1>Personal Info</h1>
            <h2>Full Name</h2>
            <p>
              {this.state.firstname+" "+this.state.lastname} 
            </p>
            
            <h2>Phone number</h2>
            <p>{this.state.PhoneNumber}</p>
            <h2>Zipcode</h2>
    <p>{this.state.Zipcode}</p>
            <h2>Street</h2>
    <p>{this.state.street}</p>
          
            
            <button onClick={()=>{
              this.setState({change:true})
              this.setState({profile:false})
            }}>Change Information</button>
          </div>


          <div className={this.state.change ?  ProfileStyle.change:ProfileStyle.noshow}>
          <form action="upload.php" method="post" encType="multipart/form-data">
    <label htmlFor="fileToUpload">
  <div className={avatarStyle.profile_pic} >
      <span className={(avatarStyle.glyphicon, avatarStyle.glyphicon_camera)} ></span>
      <img className={avatarStyle.profile_pic} src={this.state.photo}></img>
      <span>Click for change Image</span>
  </div>
  </label>
  <input type="File" name="fileToUpload" id="fileToUpload"></input>
</form>
            <h1>Personal Info</h1>
            <h2>First Name</h2>
            <input onChange={this.handleChange.bind(this)} name="firstName">
             
            </input>
            <h2>last Name</h2>
            <input onChange={this.handleChange.bind(this)} name="lastName">
             
            </input>
          
            
            <h2>Phone number</h2>
            <input onChange={this.handleChange.bind(this)} name="phoneNumber"></input>
            <h2>Zipcode</h2>
    <input onChange={this.handleChange.bind(this)} name="zipCode"></input>
            <h2>Street</h2>
    <input onChange={this.handleChange.bind(this)} name="street"></input>
            <button onClick={this.saveInfo}>Save Information</button>
          </div>


          <div className={this.state.payment ?  ProfileStyle.payment:ProfileStyle.noshow}>
          <div className={cardStyle.creditcard}>
  <div className={cardStyle.top_card}>
    <h2 className={cardStyle.payment}>PAYMENT<br/>DETAILS</h2>
    <h1 className={cardStyle.visa}>VISA</h1>
  </div>
  <div className={cardStyle.bottom_card}>
    <div className={cardStyle.row_1}>
      <div className={cardStyle.card_holder_element}>
        <h6 className={cardStyle.row_1_grey}>CARDHOLDER'S NAME</h6>
        <div className={cardStyle.textbox1} contenteditable="true">Johny Relative</div>
      </div>
      <div className={cardStyle.card_number_element}>
        <h6 className={cardStyle.row_1_grey}>CARD NUMBER</h6>
        <div className={cardStyle.textbox1} contenteditable="true">4478 6322 9923 8990</div>
      </div>
    </div>
    <div className={cardStyle.row_2}>
      <div className={cardStyle.expiry_date_element}>
        <h6 className={cardStyle.row_2_grey}>EXPIRY DATE</h6>
       <div className={cardStyle.textbox2} contenteditable="true">July</div>
        <select>
          <option>01</option>
          <option>02</option>
          <option>03</option>
          <option>04</option>
          <option>05</option>
          <option>06</option>
          <option>07</option>
          <option>08</option>
          <option>09</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select>
      </div>
      <div className={cardStyle.expiry_date_element}>
        <h6 className={cardStyle.row_2_grey}>&nbsp;</h6>
       <div className={cardStyle.textbox3} contenteditable="true">2017</div>
        <select>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <option>18</option>
          <option>19</option>
          <option>20</option>
          <option>21</option>
          <option>22</option>
          <option>23</option>
        </select>
      </div>
      <div className={cardStyle.cvv_element}>
        <h6 className={cardStyle.row_2_grey}>CVV</h6>
        <div className={cardStyle.textbox2} contenteditable="true">123</div>
      </div>
    </div>
  </div>
</div></div>
          

         
          <div className={this.state.settings ?  ProfileStyle.settings:ProfileStyle.noshow}>
            <h1>Account Settings</h1>
            <h2>
              Password
              <button className={ProfileStyle.btn}>Change</button>
            </h2>
            <p></p>
            <h2>
             Email
              <button className={ProfileStyle.btn}>Change</button>
            </h2>
            <p></p>
            <h2>
           Phone number{" "}
              <button className={ProfileStyle.btn}>Change</button>
            </h2>
            <p></p>
            <h2>
              Your Devices{" "}
              <button className={ProfileStyle.btn}>Manage Devices</button>
            </h2>
            
           
            <p></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
