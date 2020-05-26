import React, { useState } from 'react'
import Product from './Product';
import style from '../Shop/itemFilter/filter.module.scss'

const Products =(props)=> {
    const [product, setProduct]=useState([props])
   
    return(
        <div >
            {product.map((elem,index) =>{
                
                return(
               
                    <Product viewType={props.viewType} key = {index} product={elem}/>
                    )
                })}
        </div>
    )
}
export default Products