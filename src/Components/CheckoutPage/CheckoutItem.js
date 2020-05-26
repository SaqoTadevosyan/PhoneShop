import React, { Component } from "react";
import fire from "../../backend/config"

class CheckoutItem extends Component {
  state = {
    data:[],
    product: [],
    price: 0,
  };
  componentDidMount=()=>{
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
  }
  imgChange=(elem)=>{
    return elem
    }
        
        render() {
            return (
                
                <div >
                    {this.state.data.map(elem => {
              if (elem.id == this.props.item[0]) {
                 
                return (
                    <li >
                        <div class="pl-thumb">
                           {elem.colorsAndImg.map((item)=>{
                               let color=Object.keys(item)
                               if (color[0]==this.props.item[1]){
                                   
                                   return  <img src={item[color[0]]} alt="item1" />
                               }
                           })} 
                        </div>
                        
								
								<h6>{elem.name+" "+this.props.item[2]+" "+this.props.item[1]}</h6>
								<p>${elem.configurationAndPrice.map((elem)=>{
                    if (elem[0]==this.props.item[2]){
                        
                        return elem[1]
                    }
                })}</p>
							</li>
               
               
              
            
            
            )}})}
                </div>
    );
  }
}

export default CheckoutItem;
