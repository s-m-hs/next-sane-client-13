import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import Styles from './CardC.module.css'
import { Heart, ShoppingCart } from '@phosphor-icons/react'
import addToCart from '@/utils/Functions/addToCart'
import { MainContext } from '@/context/MainContext'
// import getLocalStorage from '@/utils/localStorag/localStorage'
import alertN from '@/utils/Alert/AlertA'
import updateBasket from '@/utils/ApiUrl/updateBasket'
const getLocalStorage=localStorage.getItem('loginToken')


export default function CardC({imgSrc,title,price,id,clickSpinner }) { 
  let {setCartCounter,xtFlagLogin,setBasketFlag,setLocalUpdateBasket}=useContext(MainContext)


  const AlertA=()=>alertN('center','success'," به سبد خرید اضافه شد...",1000).then((res) => {  

});

  return (
    <div
     data-aos='fade-up'
      
     className={`${Styles.cardprob_container} centerc`}>
    <img src={imgSrc} alt="" />

    <span className={Styles.cardprob_title} > {title} </span>

    {/* <span>368,000</span> */}
    <span className={Styles.cardprob_price}>{price?.toLocaleString()}ریال </span>
    
    <div className={`${Styles.cardprob__icon_div} centerr`} >
    <ShoppingCart size={32} color="#19a7af" weight="duotone"
        onClick={()=>{
          let obj=[{
            cyProductID: id,
            quantity: 1
          }] 
          xtFlagLogin ?  updateBasket(getLocalStorage,obj,setBasketFlag,AlertA) 
          :

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

