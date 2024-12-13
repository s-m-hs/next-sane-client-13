import React, { useContext } from 'react'
import styles from './CardB.module.css'
import Link from 'next/link'
import { Heart, ShoppingCart } from '@phosphor-icons/react'
import { MainContext } from '@/context/MainContext'
import alertN from '@/utils/Alert/AlertA'
import updateBasket from '@/utils/ApiUrl/updateBasket'
import addToCart from '@/utils/Functions/addToCart'
import apiUrl from '@/utils/ApiUrl/apiUrl'



export default function CardB({imgSrc,title,price,id,clickSpinner }) {
  let {setCartCounter,xtFlagLogin,setBasketFlag,setXtFlagSpinnerShow,setLocalUpdateBasket}=useContext(MainContext)


  const AlertA=()=>alertN('center','success'," به سبد خرید اضافه شد...",1000).then((res) => {  });
  const AlertB=()=>alertN('center','info'," این محصول در سبد خرید شما موجود است ...",1000).then((res) => {  });
const addToBasket=()=>{
  const getLocalStorage =localStorage.getItem('loginToken')
  let obj={
    cyProductID: id,
    quantity: 1,
    orderItemID:0
  }
  async function myApp(){
    const res=await fetch(`${apiUrl}/api/CyOrders/addToBasket`,{
      method:'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${ getLocalStorage }`
      }, 
      body:JSON.stringify(obj)
    }).then(res=>{
      if (res.status==200){
        setBasketFlag(prev=>!prev)
        AlertA()      }else if(res.status==400){
          AlertB()
        }
    }
  
  )
  }
  myApp()
}

  return (
    <div className={`${styles.container} centerc`  } >
      <Link  href={`/product/${id}`} onClick={()=>setXtFlagSpinnerShow(true)}> <img 
      className={`${styles.img}`  }
      src={imgSrc} alt={`${title}`} 
  /></Link>

        <span className={styles.title}  > {title} </span>
        {/* <span>368,000</span> */}
        <span className={styles.price}  >{(Number(price)/10)?.toLocaleString()}تومان </span>

        
        <div className={`${styles.icon_div} centerr`}   >
        <ShoppingCart size={24} color="#19a7af" weight="duotone"
        onClick={()=>{
          xtFlagLogin ? 
          addToBasket()
          // updateBasket(getLocalStorage,obj,setBasketFlag,AlertA) 
          :

             addToCart(id,'1',setCartCounter)
          
        }}
    />
        <Heart size={24} color="#19a7af" weight="duotone" />
  

        </div>

        {/* <Link className={styles.link}
onClick={()=>setXtFlagSpinnerShow(true)}
  href={`/product/${id}`} >جزییات بیشتر...</Link> */}
{/* 
<Link className={styles.link}
href={'/'}
>جزییات بیشتر...</Link> */}
        <div>

        </div>
        
        </div>
  )
}
