import React, { Component } from 'react';
import shopingcartstyle from "./shopingcart.module.scss"
import ShopingItem from './ShopingItem';
import fire from "../../../../backend/config"
class Shopingcart extends Component {
    state = {  
        toggle:true,
        product:[],
        data:[],
        config:"",
        price:0
    }
    toggleChange=()=>{
      
        let tmp=this.state.toggle
        this.setState({toggle:!tmp})
    }
    componentDidMount(){
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
      setInterval(this.itemSet,500)

    }
    
    
    itemSet=()=>{
     
      let list=JSON.parse(localStorage.getItem("product"))
      
      if(JSON.stringify(list)!==JSON.stringify(this.state.product)){
       
        this.setState({product:list})
        this.itemPrice()
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
      }
    )
    }


  }

    render() {
        return (
            <div className={shopingcartstyle.container}>
            <nav>
  <div className={shopingcartstyle.container}>
    

    <ul className="navbar-right">
      <li onClick={this.toggleChange}><a href="#" id="cart"><i className="fa fa-shopping-cart"></i> Cart <span className={shopingcartstyle.badge}>{this.state.product ? this.state.product.length:0
      }</span></a></li>
    </ul> 
  </div> 
</nav>


<div >
  <div className={this.state.toggle ? shopingcartstyle.shopping_cart1:shopingcartstyle.shopping_cart}>
    <div className={shopingcartstyle.shopping_cart_header}>
      <i className="fa fa-shopping-cart cart-icon"></i><span className={shopingcartstyle.badge}>{this.state.product ? this.state.product.length:0
      }</span>
      <div className={shopingcartstyle.shopping_cart_total}>
        <span className={shopingcartstyle.lighter_text}>Total:</span>
        <span className={shopingcartstyle.main_color_text}>{this.state.product ? 
         this.state.price+"$" :0
      }</span>
      </div>
    </div> 

    <ul className={shopingcartstyle.shopping_cart_items}>
      {this.state.product ?     this.state.product.map((id,index)=>{
       
     return   <ShopingItem item={id} key={index} deleteid={index} />
      }):()=>{
        return <div></div>
      }}
        
      

      
    </ul>
{this.state.product==null ||  this.state.product.length==0 ? <h3>Your cart is empty</h3>:<a href="/checkout" onClick={this.checkOut} className={shopingcartstyle.button}>Checkout</a>}
    
  </div> 
</div> 
</div>  );
    }
}

export default Shopingcart;