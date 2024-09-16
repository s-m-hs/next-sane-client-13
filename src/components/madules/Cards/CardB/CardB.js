import React, { useContext } from 'react'
import styles from './CardB.module.css'
import Link from 'next/link'
import { Heart, ShoppingCart } from '@phosphor-icons/react'
import { MainContext } from '@/context/MainContext'
import alertN from '@/utils/Alert/AlertA'
import updateBasket from '@/utils/ApiUrl/updateBasket'
import addToCart from '@/utils/Functions/addToCart'



export default function CardB({imgSrc,title,price,id,clickSpinner }) {
  let {setCartCounter,xtFlagLogin,setBasketFlag,setLocalUpdateBasket}=useContext(MainContext)


  const AlertA=()=>alertN('center','success'," به سبد خرید اضافه شد...",1000).then((res) => {  

});

  return (
    <div className={`${styles.container} centerc`  } >
        <img src={imgSrc} alt="" />
        <span className={styles.title}  > {title} </span>
        {/* <span>368,000</span> */}
        <span className={styles.price}  >{price?.toLocaleString()}ریال </span>
        <div className={`${styles.icon_div} centerr`}   >
        <ShoppingCart size={32} color="#19a7af" weight="duotone"
        onClick={()=>{
          const getLocalStorage=localStorage.getItem('loginToken')
          let obj=[{
            cyProductID: id,
            quantity: 1
          }] 
          xtFlagLogin ?  updateBasket(getLocalStorage,obj,setBasketFlag,AlertA) 
          :

             addToCart(id,'1',setCartCounter)
          
        }}
    />
        <Heart size={32} color="#19a7af" weight="duotone" />
        {/* <i class="fa-solid fa-cart-plus " style={{color:'#14a5af'}} ></i>
        <i class="fa-solid fa-heart " style={{color:'#14a5af'}} ></i> */}

        </div>
        <Link className={styles.link}
onClick={clickSpinner}
  href={`/product/${id}`} >جزییات بیشتر...</Link>
{/* 
<Link className={styles.link}
href={'/'}
>جزییات بیشتر...</Link> */}
        <div>

        </div>
        
        </div>
  )
}
