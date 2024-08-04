import React from 'react'
import styles from './CardB.module.css'
import Link from 'next/link'
import { Heart, ShoppingCart } from '@phosphor-icons/react'



export default function CardB({imgSrc,title,price }) {
  return (
    <div className={`${styles.container} centerc`  } >
        <img src={imgSrc} alt="" />
        <span className={styles.title}  > {title} </span>
        {/* <span>368,000</span> */}
        <span className={styles.price}  >{price.toLocaleString()}ریال </span>
        <div className={`${styles.icon_div} centerr`}   >
        <ShoppingCart size={32} color="#19a7af" weight="fill" />
        <Heart size={32} color="#19a7af" weight="fill" />
        {/* <i class="fa-solid fa-cart-plus " style={{color:'#14a5af'}} ></i>
        <i class="fa-solid fa-heart " style={{color:'#14a5af'}} ></i> */}

        </div>
<Link className={styles.link}
href={'/'}
>جزییات بیشتر...</Link>
        <div>

        </div>
        
        </div>
  )
}
