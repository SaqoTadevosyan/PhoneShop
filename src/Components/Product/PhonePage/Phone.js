import React, { Component } from "react";
import Data from "../../../data";
import Style from "./Phone.module.css"


import ColorChange from "./ColorChange";
import Configuration from "./Configuration";
import ImgChange from "./ImgChange";
class Phone extends Component {
  state = {
    list:"",
    color:"",
    configuration:"",
    imgLink:null,
    colorSelected:false,
    configSelected:false,
    selectError:false
  };
  
 colorChange=(img,Color)=>{

this.setState({colorSelected:true})
this.setState({imgLink:img})
this.setState({color:Color})
 }
 configChange=(config)=>{
 
  this.setState({configSelected:true})
  this.setState({configuration:config})
   }
  
  buyProduct=(id)=>{
  if(this.state.colorSelected & this.state.configSelected){
  if(localStorage.getItem("product")){
    let list=JSON.parse(localStorage.getItem("product"))
  list.push([id,this.state.color,this.state.configuration])
  localStorage.setItem("product",JSON.stringify(list))
 console.log(list)
  }else{
    let list=[]
    list.push([id,this.state.color,this.state.configuration])
    localStorage.setItem("product",JSON.stringify(list))

  }
}
 else{
   this.setState({selectError:true})
   return
 }
}

  render() {
    
    return (
      <div >
        
        {Data.map(elem => {
          if (elem.id == this.props.match.params.id) {
            return (
              <div >
                <main className={Style.container64}>


<div className={Style.left_column}>
  
  <img data-image="red" className={Style.active} src={this.state.imgLink ? this.state.imgLink:elem.img } alt=""></img>
{/* <div className={Style.imageSelect}><ImgChange/></div> */}
</div>


<div className={Style.right_column}>

  
  <div className={Style.product_description}>
    <span>SmartPhone</span>
            <h1>{elem.name}</h1>
    <div className={Style.phone_info}>
      <div className={Style.stiii2}>{elem.info}</div></div>
  </div>

  
  <div className={Style.product_configuration}>

    
    <div className={Style.product_color}>
      <span>Color</span>

      <div className={Style.color_choose} >
        {elem.colorsAndImg.map((color,index)=>{
          
         let phoneColor= Object.keys(color)
         let phoneImg=Object.values(color)
         
     return  <ColorChange Color={phoneColor[0]} imgLink={phoneImg[0]} colorChange={this.colorChange} key={index}/>
        })}
      </div>

    </div>

    
    <div className={Style.cable_config}>
      <span>Phone configuration</span>

      <div className={Style.cable_choose}>
        {elem.configurationAndPrice.map((config,index)=>{
      return    <Configuration configuration={config[0]} key={index} configChange={this.configChange}/>
      
        })}
        
      </div>
      <div className={this.state.selectError? null:Style.noshow}>
      <div className={this.state.colorSelected & this.state.configSelected ? Style.noshow:Style.selectError}>Please select {this.state.colorSelected ? null:"color"} {this.state.colorSelected && this.state.configSelected ? null:","}  {this.state.configSelected ? null:"configuretion"}</div>
      </div>
    </div>
  </div>

  
  <div className={Style.product_price}>
      <span>$ {elem.configurationAndPrice.map((config,index)=>{
      if (config[0]==this.state.configuration ){
        return config[1]
      }
      
        })}</span>
        
   <span onClick={this.buyProduct.bind(this,elem.id)}> <a href="#" className={Style.cart_btn11}>Add to cart</a></span>
  </div>
</div>
</main>

              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default Phone;
