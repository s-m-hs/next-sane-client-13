import React from 'react'
import Link from 'next/link'
import Styles from './CardC.module.css'


export default function CardC({imgSrc,title,price,id }) {
  return (
    <div data-aos='fade-up'  className={`${Styles.cardprob_container} centerc`}>
    <img src={imgSrc} alt="" />
    <span className={Styles.cardprob_title} > {title} </span>
    {/* <span>368,000</span> */}
    <span className={Styles.cardprob_price}>{price}تومان </span>
    <div className={`${Styles.cardprob__icon_div} centerc`} >
    {/* <i class="fa-solid fa-cart-plus " style={{color:'#14a5af'}} ></i>
    <i class="fa-solid fa-heart " style={{color:'#14a5af'}} ></i> */}

    </div>
<Link className={Styles.cardprob__link}
  href={`/product/${id}`} >جزییات بیشتر...</Link>
    <div>

    </div>
    
    </div>  )
}

