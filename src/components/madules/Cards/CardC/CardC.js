'use client'
import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import Styles from './CardC.module.css'
import { Heart, ShoppingCart } from '@phosphor-icons/react'
import addToCart from '@/utils/Functions/addToCart'
import { MainContext } from '@/context/MainContext'
import alertN from '@/utils/Alert/AlertA'
import updateBasket from '@/utils/ApiUrl/updateBasket'


export default function CardC({imgSrc,title,price,id,clickSpinner,supply }) { 
  let {setCartCounter,xtFlagLogin,setBasketFlag,setXtFlagSpinnerShow,setLocalUpdateBasket}=useContext(MainContext)


  const AlertA=()=> {
if(supply!=0){
  alertN('center','success'," به سبد خرید اضافه شد...",1500)
}
else if(supply==0){alertN('center','success'," برای استعلام قیمت به سبد خرید اضافه شد...",1500);}
  } ;
// console.log(supply)
  return (
    <div
     data-aos='fade-up'
      
     className={`${Styles.cardprob_container} centerc`}>

      <Link  className={`${Styles.cardprob_container_linkA}`} 
      onClick={()=>setXtFlagSpinnerShow(true)}
  href={`/product/${id}`}>
      <img src={imgSrc} alt="" />

      </Link> 

    <span className={Styles.cardprob_title} > {title} </span>

    {/* <span>368,000</span> */}
{supply!=0  ?  
    <span className={Styles.cardprob_price}>{price?.toLocaleString()}تومان </span>
:
<span className={Styles.cardprob_price}>استعلام قیمت</span>


  }

    
    <div className={`${Styles.cardprob__icon_div} centerr`} >
    <ShoppingCart size={32} color="#19a7af" weight="duotone"
        onClick={()=>{
          const getLocalStorage=localStorage.getItem('loginToken')

          let obj=[{
            cyProductID: id,
            quantity: 1,
            orderItemID: 0,
          }] 
          xtFlagLogin  ?  updateBasket(getLocalStorage,obj,setBasketFlag,AlertA) 
          :
             addToCart(id,'1',setCartCounter)
          
        }}
    />
    {/* <ShoppingCart size={32} color="#19a7af" weight="fill" /> */}
    <Heart size={32} color="#19a7af" weight="duotone" />
    {/* <Heart size={32} color="#19a7af" weight="fill" /> */}


    </div>
{/* <Link className={Styles.cardprob__link}
// onClick={clickSpinner}
onClick={()=>setXtFlagSpinnerShow(true)}
  href={`/product/${id}`} >جزییات بیشتر...</Link> */}
    <div>

    </div>
    
    </div>  )
}

