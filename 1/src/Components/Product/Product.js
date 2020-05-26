import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import sty from "./Product.module.css"


class Product extends Component {
    state = {  

       
    }

    buyProduct=(id)=>{
      
      if(localStorage.getItem("product")){
        let list=JSON.parse(localStorage.getItem("product"))
      list.push(id)
      localStorage.setItem("product",JSON.stringify(list))
     console.log(list)
      }else{
        let list=[]
        list.push(id)
        localStorage.setItem("product",JSON.stringify(list))
    
      }
      
     
    }


    render() {
      
        return (
            <div >
            
              {this.props.viewType=="list" ? <div className="col-md-4 col-xs-6">
              <div className={sty.product_wrap} onClick={()=> this.props.history.push('/' + this.props.product.item.id)}>
                    <div className="product">
                      <div className="product-img">
                        <img src={this.props.product.item.img} alt=""></img>
                        <div className="product-label">
                          <span className="sale">-15%</span>
                          <span className="new">NEW</span>
                        </div>
                      </div>
                      <div className="product-body">
                        <p className="product-category">{this.props.product.item.company}</p>
                        <h3 className="product-name">
                          <a href="#">{this.props.product.item.name}</a>
                        </h3>
                        <h4 className="product-price">
                          ${this.props.product.item.configurationAndPrice[0][1]} <del className="product-old-price">{Math.ceil(this.props.product.item.configurationAndPrice[0][1]*100/85) }</del>
                        </h4>
                        {/* <div className="product-rating">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div> */}
                        
                      </div>
                      <div className="add-to-cart">
                        <button className="add-to-cart-btn">
                          <i className="fa fa-shopping-cart"></i> BUY
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
:<div className={sty.itemContainer}>
  <div>
  <img src={this.props.product.item.img} alt=""></img>
  <span>{this.props.product.item.company}</span>
<h3>{this.props.product.item.name}</h3>
                      <p>{this.props.product.item.info}</p>
  </div>
  <div className={sty.priceBlock}>

  <h4> ${this.props.product.item.configurationAndPrice[0][1]}</h4>
  <button onClick={()=> this.props.history.push('/' + this.props.product.item.id)}>BUY</button>

  </div>
  
  
  </div>}
            </div>
        
        );
    }
}

export default withRouter(Product) 