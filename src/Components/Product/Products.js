import React, { useState } from 'react'
import Product from './Product';
import s from './Products.module.css'

const Products =(props)=> {
    const [product, setProduct]=useState([props])
   
    return(
        <div className={s.root} >
            {product.map((elem,index) =>{
                
                return(
               
                    <Product viewType={props.viewType} key = {index} product={elem}/>
                    )
                })}
        </div>
    )
}
export default Products