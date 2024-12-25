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


export default function CardC({imgSrc,title,price,id,clickSpinner,supply }) { 
  let {setCartCounter,xtFlagLogin,setBasketFlag,setXtFlagSpinnerShow,setLocalUpdateBasket}=useContext(MainContext)
  const [parentId,setParentId]=useState('')





  const AlertA=()=> {
if(supply!=0){
  alertN('center','success'," به سبد خرید اضافه شد...",1500)
}
else if(supply==0){alertN('center','success'," برای استعلام قیمت به سبد خرید اضافه شد...",1500);}
  } ;

  const AlertB=()=>alertN('center','info'," این محصول در سبد خرید شما موجود است ...",1000).then((res) => {  });
  const addToBasket=()=>{
    const getLocalStorage =localStorage.getItem('loginToken')
    let obj={
      cyProductID: id,
      quantity: 1,
      orderItemID:0
    }
    console.log(obj)
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


const getChild=()=>{
  const getLocalStorage =localStorage.getItem('loginToken')
 let  obj={
    gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    id: id
    ,
    str: "string"
}
  async function myApp(){
const res= await fetch(`${apiUrl}/api/CyProductCategory/GetItemWChildAndRoot`,{
  method:'POST',
  headers: {
    "Content-Type": "application/json",
    Authorization:`Bearer ${ getLocalStorage }`
  }, 
  body: JSON.stringify(obj)
}).then(res=>{
  console.log(res)
  return res.json().then(result=>{
    console.log(result)
    setParentId(result.root.rootId)
  })
})
  }
  myApp()
}
useEffect(()=>{ 
    getChild()

},[])

// console.log(supply)
  return (
    <div
     data-aos='fade-up'
      
     className={`${Styles.cardprob_container} centerc `}>

      <Link  className={`${Styles.cardprob_container_linkA}`} 
      onClick={()=>setXtFlagSpinnerShow(true)}
  href={`/product/${id}`}>
      <img src={imgSrc} alt={`${title}`} />

     

    <span className={Styles.cardprob_title} > {title} </span>

    {/* <span>368,000</span> */}
{supply!=0  ?  
    <span className={Styles.cardprob_price}>{price?.toLocaleString()}تومان </span>
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

