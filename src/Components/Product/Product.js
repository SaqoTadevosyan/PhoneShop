import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import style from "./Product.module.scss";

class Product extends Component {
  state = {};

  buyProduct = (id) => {
    if (localStorage.getItem("product")) {
      let list = JSON.parse(localStorage.getItem("product"));
      list.push(id);
      localStorage.setItem("product", JSON.stringify(list));
      console.log(list);
    } else {
      let list = [];
      list.push(id);
      localStorage.setItem("product", JSON.stringify(list));
    }
  };

  render() {
    return (
      <div>
        {this.props.viewType == "list" ? (
          <div className={style.container} onClick={() =>
            this.props.history.push("/" + this.props.product.item.id)
          }>
           
              <div className={style.product}>
                
                  <img src={this.props.product.item.img} alt=""></img>
                  <div className={style.productBody}>
                  <p >
                    {this.props.product.item.company}
                  </p>
                  <h3 >
                    <a href="#">{this.props.product.item.name}</a>
                  </h3>
                  <h4 className="product-price">
                    ${this.props.product.item.configurationAndPrice[0][1]}{" "}
                    <del className="product-old-price">
                      {Math.ceil(
                        (this.props.product.item.configurationAndPrice[0][1] *
                          100) /
                          85
                      )}
                    </del>
                  </h4>
                  
                </div>
                </div>
               
                </div>
                
        ) : (
          <div className={style.itemContainer}>
            <div>
              <img src={this.props.product.item.img} alt=""></img>
              <span>{this.props.product.item.company}</span>
              <h3>{this.props.product.item.name}</h3>
              <p>{this.props.product.item.info}</p>
            </div>
            <div className={style.priceBlock}>
              <h4> ${this.props.product.item.configurationAndPrice[0][1]}</h4>
              <button
                onClick={() =>
                  this.props.history.push("/" + this.props.product.item.id)
                }
              >
                BUY
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Product);
