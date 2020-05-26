import React, { Component } from 'react';
import Products from "../../Components/Product/Products";
import Header from "../../Components/Header/Header";
import OurProducts from "../../data";
import homeStyle from "./Home.module.css"
class Home extends Component {
    state = {
        product:OurProducts
      }
    render() {
        return (
          <div>
           <section className={homeStyle.section_a}>
      <div className={homeStyle.container35}>
        <div>
          <h1>The smartphontes of the future.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            repudiandae rerum libero ipsum asperiores omnis mollitia, nostrum
            commodi placeat ea itaque modi corrupti corporis nam voluptas aut
            reprehenderit eaque culpa.
          </p>
          <a href="#" className={homeStyle.btn}>Read More</a>
        </div>
        <img src="https://ae01.alicdn.com/kf/Uc4a4edbd136c418b9fcba4090caa3361l/Mobile-Xiaomi-Smartphones-6941059630869-Smartphone-Xiaomi-Redmi-Note-8-4G-64-GB-4-GB-RAM-Dual.jpg" alt="" />
      </div>
    </section>

   
    <section id="about" className={homeStyle.section_b}>
      <div className={homeStyle.overlay}>
        <div className={homeStyle.section_b_inner} >
          <h3 >Loud  Clear</h3>
          <h2  >People Aren't Hearing All the Music</h2>
          <p >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            repudiandae laboriosam quia, error tempore porro ducimus voluptate
            laborum nostrum iure.
          </p>
        </div>
      </div>
    </section>

    
    <section className={homeStyle.section_c}>
      <div className={homeStyle.gallery}>
        <a href="" className={homeStyle.big}
          ><img src="https://i.ibb.co/CHLBZnp/gal2323.jpg" alt=""
        /></a>
        <a href="" className={homeStyle.big}
          ><img src="https://i.ibb.co/4pBbhfY/gal39834.jpg" alt=""
        /></a>
        <a href="" className={homeStyle.big}
          ><img src="https://i.ibb.co/xSnHP7g/gal43884.jpg" alt=""
        /></a>
        <a href="" className={homeStyle.big}
          ><img src="https://i.ibb.co/QN6Bnrb/gal4958.jpg" alt=""
        /></a>
        <a href="" className={homeStyle.big}>
          <img src="https://www.lifeinnorway.net/wp-content/uploads/2019/11/smartphone-apps-norway.jpg" alt=""
        /></a>
        <a href="" className={homeStyle.big}
          ><img src="https://i.ibb.co/S6FVFNt/gal74744.jpg" alt=""
        /></a>
      </div>
    </section>

    
    
        </div>
        
        
        
        
        
        );
    }
}

export default Home;