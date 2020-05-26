import React, { Component } from "react";

import Data from "../../data.js";
class CheckoutItem extends Component {
  state = {
    product: [],
    price: 0,
  };
  imgChange=(elem)=>{
    return elem
    }
        
        render() {
            return (
                
                <div >
                    {Data.map(elem => {
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
