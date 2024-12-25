'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Styles from './CardC.module.css'
import { Heart, ShoppingCart } from '@phosphor-icons/react'
import addToCart from '@/utils/Functions/addToCart'
import { MainContext } from '@/context/MainContext'
import alertN from '@/utils/Alert/AlertA'
import updateBasket from '@/utils/ApiUrl/updateBasket'
import apiUrl from '@/utils/ApiUrl/apiUrl'
import alertQ from '@/utils/Alert/AlertQ'


export default function CardC({imgSrc,title,price,id,clickSpinner,supply,parentId }) { 
  let {setCartCounter,xtFlagLogin,setBasketFlag,setXtFlagSpinnerShow,setLocalUpdateBasket}=useContext(MainContext)





  const AlertA=()=> {
if(supply!=0){
  alertN('center','success'," به سبد خرید اضافه شد...",1500)
}
else if(supply==0){alertN('center','success'," برای استعلام قیمت به سبد خرید اضافه شد...",1500);}
  } ;

  const AlertB=()=>alertN('center','info'," این محصول در سبد خرید شما موجود است ...",1000).then((res) => {  });
  const AlertC=()=>alertQ('center','info'," برای استعلام قیمت میتوانید با همکاران ما ارتباط داشته باشید،همکاران ما در کم ترین زمان پاسخ شما را خواهند داد (از ابزارک گفتگو پایین سمت راست استفاده کنید)...",'باشه ...').then((res) => {  });
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
        console.log(res)
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




// console.log(supply)
  return (
    <div
     data-aos='fade-up'
      
     className={`${Styles.cardprob_container} centerc `}>
      {parentId==2 && 
      <span className={`${Styles.RequstPrice} centerc `}
      onClick={AlertC}
      >استعلام قیمت</span>}

      <Link  className={`${Styles.cardprob_container_linkA}`} 
      onClick={()=>setXtFlagSpinnerShow(true)}
  href={`/product/${id}`}>
      <img src={imgSrc} alt={`${title}`} />

     

    <span className={Styles.cardprob_title} > {title} </span>

    {/* <span>368,000</span> */}
{supply!=0  ?  
    <span className={Styles.cardprob_price}>{price?.toLocaleString()}تومان </span>
:
parentId==2 ?
''
:
<span className={Styles.cardprob_price}>ناموجود</span>


  }

     </Link> 
    <div className={`${Styles.cardprob__icon_div} centerr`} >
    {/* <ShoppingCart size={32}
     color="#24b8c9de"

      weight="fill"
        onClick={()=>{
          // const getLocalStorage=localStorage.getItem('loginToken')

          // let obj=[{
          //   cyProductID: id,
          //   quantity: 1,
          //   orderItemID: 0,
          // }] 
          xtFlagLogin  ?  
          addToBasket()

          // updateBasket(getLocalStorage,obj,setBasketFlag,AlertA) 
          :
             addToCart(id,'1',setCartCounter)
          
        }}
    /> */}
    {/* <Heart size={32}
     color="#d757eb"
    weight="thin" /> */}


    </div>
{/* <Link className={Styles.cardprob__link}
// onClick={clickSpinner}
onClick={()=>setXtFlagSpinnerShow(true)}
  href={`/product/${id}`} >جزییات بیشتر...</Link> */}
    <div>

    </div>
    
    </div>  )
}

