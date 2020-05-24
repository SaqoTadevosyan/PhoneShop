import React, { Component } from 'react';
import Products from "../Product/Products";
import Header from "../Header/Header";
import OurProducts from "../../data";
import Filter from './itemFilter/Filter';


class Shop extends Component {
    state = {
        product:OurProducts
      }
    render() {
        return (
<div>
<Filter/>

          
            
            </div>
        );
    }
}

export default Shop;