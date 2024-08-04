import React, { useContext } from 'react'
import Link from 'next/link'
import Styles from './CardC.module.css'
import { Heart, ShoppingCart } from '@phosphor-icons/react'
import addToCart from '@/utils/Functions/addToCart'
import { MainContext } from '@/context/MainContext'


export default function CardC({imgSrc,title,price,id,clickSpinner }) {
  let {setCartCounter}=useContext(MainContext)

  return (
    <div data-aos='fade-up'  className={`${Styles.cardprob_container} centerc`}>
    <img src={imgSrc} alt="" />
    <span className={Styles.cardprob_title} > {title} </span>
    {/* <span>368,000</span> */}
    <span className={Styles.cardprob_price}>{price?.toLocaleString()}ریال </span>
    <div className={`${Styles.cardprob__icon_div} centerr`} >
    <ShoppingCart size={32} color="#19a7af" weight="duotone"
        onClick={()=>{
          // let obj=[{
          //   cyProductID: props.id,
          //   quantity: 1
          // }] 
          // flagLogin==true ?  updateBasket(getLocalStorage,obj,setBasketFlag,alert) 
          // :

             addToCart(id,'1',setCartCounter)
          
        }}
    />
    {/* <ShoppingCart size={32} color="#19a7af" weight="fill" /> */}
    <Heart size={32} color="#19a7af" weight="duotone" />
    {/* <Heart size={32} color="#19a7af" weight="fill" /> */}


    </div>
<Link className={Styles.cardprob__link}
onClick={clickSpinner}
  href={`/product/${id}`} >جزییات بیشتر...</Link>
    <div>

    </div>
    
    </div>  )
}

