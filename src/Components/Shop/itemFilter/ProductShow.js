import React, { Component } from "react";
import style from "./filter.module.scss"
import Products from "../../Product/Products";
import fire from "../../../backend/config"

class ProductShow extends Component {
  state = {
    product: [],
    idlist: [],
  };
  componentDidMount = () => {
    let db=[]
    fire
    .database()
    .ref("/data")
    .once("value")
    .then((snapshot) => {
      db = snapshot.val();
    })
    .then(() => {
   this.setState({product:db})})
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
<div className={this.props.viewType==="list" ?  style.app:null}>
{ this.state.idlist.map((it) => {
  
   return   this.state.product.map((elem) => {
        if (it === elem.id) {
          return (
            
              <Products viewType={this.props.viewType} key={elem.id} item={elem} />
            
          );
        }
        return
      });
    })}

   </div> 
)

      }  
   
  }

export default ProductShow;
