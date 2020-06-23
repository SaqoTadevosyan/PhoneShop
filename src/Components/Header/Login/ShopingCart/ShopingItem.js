import React, { Component } from "react";
import shopingcartstyle from "./shopingcart.module.scss";
import fire from "../../../../backend/config";
class ShopingItem extends Component {
  state = {
    data: [],
    product: [],
    price: 0,
  };
  deleteItem = (id) => {
    let list = JSON.parse(localStorage.getItem("product"));
    list.splice(id[0], 1);

    localStorage.setItem("product", JSON.stringify(list));
  };

  componentDidMount = () => {
    let db = [];
    fire
      .database()
      .ref("/data")
      .once("value")
      .then((snapshot) => {
        db = snapshot.val();
      })
      .then(() => {
        this.setState({ data: db });
      });
  };
  imgChange = (elem) => {
    return elem;
  };

  render() {
    return (
      <div className={shopingcartstyle.productWidget}>
        {this.state.data.map((elem, index) => {
          if (elem.id === this.props.item[0]) {
            return (
              <li className={shopingcartstyle.clearfix} key={index}>
                <div>
                  {elem.colorsAndImg.map((item, index) => {
                    let color = Object.keys(item);
                    if (color[0] === this.props.item[1]) {
                      return (
                        <img src={item[color[0]]} alt="item1" key={index} />
                      );
                    }
                    return
                  })}
                </div>
                <button
                  className={shopingcartstyle.delete}
                  onClick={this.deleteItem.bind(this.props.deleteid)}
                >
                  X
                </button>

                <span className={shopingcartstyle.item_name}>
                  {elem.name +
                    " " +
                    this.props.item[2] +
                    " " +
                    this.props.item[1]}
                </span>

                <span className={shopingcartstyle.item_price}>
                  $
                  {elem.configurationAndPrice.map((elem) => {
                    if (elem[0] === this.props.item[2]) {
                      return elem[1];
                    }
                    return
                  })}
                </span>
              </li>
            );
          }
          return
        })}
      </div>
    );
  }
}

export default ShopingItem;
