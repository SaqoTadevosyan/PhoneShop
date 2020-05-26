import React, { Component } from "react";

import fire from "../../backend/config"

import CheckoutItem from "./CheckoutItem"
class CheckoutPage extends Component {
  state = {
	  data:[],
   product:[],
   price:0,
   adressType:true
   
  };
 componentDidMount=()=>{
	this.itemSet()
	let db=[]
    fire
    .database()
    .ref("/data")
    .once("value")
    .then((snapshot) => {
      db = snapshot.val();
    })
    .then(() => {
   this.setState({data:db})})
	setTimeout(()=>{this.userInfo()},2000) 
 }


 
 itemSet=()=>{
     
	let list=JSON.parse(localStorage.getItem("product"))
	
	if(JSON.stringify(list)!==JSON.stringify(this.state.product)){
	 
	  this.setState({product:list},()=>{

		  this.itemPrice()
	  })
	}   
	  

  }
  itemPrice=()=>{
	
	if(this.state.product){ 
	  if(this.state.product==[]){
		this.setState({price:0})
		return 
	  }
	  let tmp=0
	this.state.product.map(elem=>{
	 this.state.data.map(item=>{
		if(elem[0]==item.id){
		  
		  item.configurationAndPrice.map((i)=>{
			
			if (i[0]==elem[2]){
			
			  tmp+=i[1]
this.setState({price:tmp})

			}
		  })

		}
	  })
	})}
   
  }
  userInfo=()=>{
	console.log("post")
	let uid=fire.auth().currentUser.uid
	fire.database().ref('/' + uid).once('value').then((snapshot)=> {
	  let city = snapshot.val().city
	  let zipcode=snapshot.val().zipcode
	  let street = snapshot.val().street
	  let phone=snapshot.val().number
	  
	  this.setState({city:city})
	  this.setState({zipCode:zipcode})
	  this.setState({street:street})
	  this.setState({phone:phone})
	  
	});
  }

 
handleChange=(event)=>{
	
if(event.target.id=="one"){
	this.setState({adressType:true})
	console.log("one")
}
if(event.target.id=="two"){
	this.setState({adressType:false})
	console.log("two")
}
}







  render() {
    return (
      <div className="checkout">
  
  <section className="checkout-section spad">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 order-2 order-lg-1">
					<form className="checkout-form">
						<div className="cf-title">Billing Address</div>
						<div className="row">
							<div className="col-md-7">
								<p>*Billing Information</p>
							</div>
							<div className="col-md-5">
								<div className="cf-radio-btns address-rb">

									<div className="cfr-item">
										<input type="radio" name="pm" id="one" onChange={this.handleChange.bind(this)} ></input>
										<label for="one">Use my regular address</label>
									</div>
									<div className="cfr-item">
										<input type="radio" name="pm" id="two" onChange={this.handleChange.bind(this)}></input>
										<label for="two">Use a different address</label>
									</div>
								</div>
							</div>
						</div>
						{this.state.adressType ? <div className="row address-inputs">
							<div className="col-md-12">
								<h3 >{this.state.street}</h3>
								<h3 >{this.state.city}</h3>
								<h3></h3>
							</div>
							<div className="col-md-6">
								<h3 >{this.state.zipCode}</h3>
							</div>
							<div className="col-md-6">
								<h3 >{this.state.phone}</h3>
							</div>
						</div>:<div className="row address-inputs">
							<div className="col-md-12">
								<input type="text" placeholder={this.state.zipcode}></input>
								<input type="text" placeholder="Address line 2"></input>
								<input type="text" placeholder="Country"></input>
							</div>
							<div className="col-md-6">
								<input type="text" placeholder="Zip code"></input>
							</div>
							<div className="col-md-6">
								<input type="text" placeholder="Phone no."></input>
							</div>
						</div>}
						
						
						
						
						<iframe src={"https://money.yandex.ru/quickpay/button-widget?targets=BUY&default-sum="+this.state.price+"&button-text=12&yamoney-payment-type=on&button-size=m&button-color=black&successURL=&quickpay=small&account=410019505902753&"} width="184" height="36" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
						<iframe src={"https://money.yandex.ru/quickpay/button-widget?targets=BUY&default-sum="+this.state.price+"&button-text=12&any-card-payment-type=on&button-size=m&button-color=black&successURL=&quickpay=small&account=410019505902753&"} width="184" height="36" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
					</form>

				</div>
				<div className="col-lg-4 order-1 order-lg-2">
					<div className="checkout-cart">
						<h3>Your Cart</h3>
						<ul className="product-list">
							{this.state.product.length>0 ? this.state.product.map((id,index)=>{

							return	<CheckoutItem item={id} key={index}/>
							}):null}
							
						</ul>
						<ul className="price-list">
							
						<li className="total">Total<span>${this.state.price}</span></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
    
  </div>
    );
  }
}

export default CheckoutPage;
