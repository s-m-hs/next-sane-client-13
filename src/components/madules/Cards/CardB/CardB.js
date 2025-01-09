import React, { useContext, useEffect, useState } from 'react'
import styles from './CardB.module.css'
import Link from 'next/link'
import { Heart, ShoppingCart } from '@phosphor-icons/react'
import { MainContext } from '@/context/MainContext'
import alertN from '@/utils/Alert/AlertA'
import updateBasket from '@/utils/ApiUrl/updateBasket'
import addToCart from '@/utils/Functions/addToCart'
import apiUrl from '@/utils/ApiUrl/apiUrl'
import alertQ from '@/utils/Alert/AlertQ'



export default function CardB({imgSrc,title,price,id,clickSpinner,supply ,cyProductCategoryId,categoryCode,offer,noOffPrice
}) {
  let {setCartCounter,xtFlagLogin,setBasketFlag,setXtFlagSpinnerShow,setLocalUpdateBasket}=useContext(MainContext)
const [parentId,setParentId]=useState('')

  // const AlertA=()=>alertN('center','success'," به سبد خرید اضافه شد...",1000).then((res) => {  });
  // const AlertB=()=>alertN('center','info'," این محصول در سبد خرید شما موجود است ...",1000).then((res) => {  });
  const AlertC=()=>alertQ('center','info'," برای استعلام قیمت میتوانید با همکاران ما ارتباط داشته باشید،همکاران ما در کم ترین زمان پاسخ شما را خواهند داد (از ابزارک گفتگو پایین سمت راست استفاده کنید)...",'باشه ...').then((res) => {  });
// const addToBasket=()=>{
//   const getLocalStorage =localStorage.getItem('loginToken')
//   let obj={
//     cyProductID: id,
//     quantity: 1,
//     orderItemID:0
//   }
//   async function myApp(){
//     const res=await fetch(`${apiUrl}/api/CyOrders/addToBasket`,{
//       method:'POST',
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:`Bearer ${ getLocalStorage }`
//       }, 
//       body:JSON.stringify(obj)
//     }).then(res=>{
//       if (res.status==200){
//         setBasketFlag(prev=>!prev)
//         AlertA()      }else if(res.status==400){
//           AlertB()
//         }
//     }
  
//   )
//   }
//   myApp()
// }


  return (
    <div className={`${styles.container} centerc`  } >
      <Link  href={`/product/${id}`} onClick={()=>setXtFlagSpinnerShow(true)}> <img 
      className={`${styles.img}`  }
      src={imgSrc} alt={`${title}`} 
  /></Link>

        <span className={styles.title}  > {title} </span>
        {/* <span>368,000</span> */}
        {supply!=0 ?  
        <>
        {offer==1 && noOffPrice===price && 
                   <span className={styles.price}  >{price?.toLocaleString()}تومان </span>  }


{noOffPrice!==price && <>
<div className='centerc'>
    <span className={styles.price}  >{noOffPrice?.toLocaleString()}تومان </span>
  <span className={`${styles.noOffPrice} ${styles.underline}`}  >{price?.toLocaleString()}تومان </span>
</div>

</>}

{offer!=1 && noOffPrice===price  && 
  <div className='centerc'>
    <span className={styles.price}  >{(price*offer)?.toLocaleString()}تومان </span>
  <span className={`${styles.noOffPrice} ${styles.underline}`}  >{price?.toLocaleString()}تومان </span>
</div>
}


        </>
     : 
        // parentId == 2 ?
        categoryCode==='hardwairebestseller' ?
        <span onClick={()=>AlertC()} style={{cursor:'pointer'}} className={styles.price}>استعلام قیمت</span>
:
        <span className={styles.price}>ناموجود</span>
}

        
       {/* <div className={`${styles.icon_div} centerr`}   >
        <ShoppingCart size={24} color="#19a7af" weight="duotone"

onClick={()=>{
  if(xtFlagLogin ){
if(supply!=0){
  addToBasket()
}else if(supply==0 && categoryCode==='hardwairebestseller' ){
  AlertC()
}
  }else{
    if(supply!=0){
      addToCart(id,'1',setCartCounter)
    }else if(supply==0){
    AlertC()
  }
  }
}}

    />
        <Heart size={24} color="#19a7af" weight="duotone" />
  

        </div> */}


        <div>

        </div>
        
        </div>
  )
}
