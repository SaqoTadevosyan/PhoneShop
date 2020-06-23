import React from 'react';
import style from "./Home.module.scss"
export default function Home(){
  return (
    <div>
     <section className={style.section_a}>
<div className={style.container}>
  <div>
    <h1>The smartphontes of the future.</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
      repudiandae rerum libero ipsum asperiores omnis mollitia, nostrum
      commodi placeat ea itaque modi corrupti corporis nam voluptas aut
      reprehenderit eaque culpa.
    </p>
    
  </div>
  <img src="https://ae01.alicdn.com/kf/Uc4a4edbd136c418b9fcba4090caa3361l/Mobile-Xiaomi-Smartphones-6941059630869-Smartphone-Xiaomi-Redmi-Note-8-4G-64-GB-4-GB-RAM-Dual.jpg" alt="" />
</div>
</section>


<section id="about" className={style.section_b}>
<div className={style.overlay}>
  <div className={style.section_b_inner} >
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






  </div>
  
  
  
  
  
  );
}
