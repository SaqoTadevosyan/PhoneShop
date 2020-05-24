import React, { Component } from "react";
import Products from "../../Product/Products";

import OurProducts from "../../../data";
class ProductShow extends Component {
  state = {
    product: OurProducts,
    idlist: [],
  };
  componentDidMount = () => {
    setInterval(() => {
      this.idListUpdate();
    }, 500);
  };
  idListUpdate = () => {
    let i = localStorage.getItem("approvedId");
    i = JSON.parse(i);
    if (this.state.idlist !== i) {
      this.setState({ idlist: i });
    }
  };

  render() {
    
    
return(
<div className="App">
{ this.state.idlist.map((it) => {
  
   return   this.state.product.map((elem) => {
        if (it == elem.id) {
          return (
            
              <Products viewType={this.props.viewType} key={elem.id} item={elem} />
            
          );
        }
      });
    })}

   </div> 
)

      }  
   
  }

export default ProductShow;
