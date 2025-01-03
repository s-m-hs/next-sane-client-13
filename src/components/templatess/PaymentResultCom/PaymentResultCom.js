'use client'

import { MainContext } from '@/context/MainContext'
import React, { useContext, useEffect } from 'react'
import style from './PaymentResultCom.module.css'
import alertQ from '@/utils/Alert/AlertQ'
import { useRouter } from 'next/navigation'
import apiUrl from '@/utils/ApiUrl/apiUrl'

export default function PaymentResultCom() {

  let {setXtFlagSpinnerShow, authority,zarrinStatus,getBasket}=useContext(MainContext)
  const route=useRouter()
const alertA=()=>alertQ('center','error','تراكنش ناموفق می باشد ...','متوجه شدم ...').then(res=>{
  route.push('/basket')
})
const alertB=()=>alertQ('center','error','مشکلی پیش آمده ...','متوجه شدم ...').then(res=>{
  route.push('/basket')
})
///////////////////
const verifyPayment=()=>{
  const getLocalStorage = localStorage.getItem("loginToken");
let obj={
  merchantId: "string",
  orderId: getBasket[0].cyOrderID,
  authority: authority
}
console.log(obj);
  async function myApp(){
    const res=await fetch(`${apiUrl}/api/ZarinPal/varifyPay`,{
      method:'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getLocalStorage}`,
      },
      body:JSON.stringify(obj)
    }).then(res=>{
      if(res.ok){
        return res.json().then(result=>{
          console.log(result);
          setXtFlagSpinnerShow(false)

        })
      }else{
        alertB()

      }
    })
  }
  myApp()
}
// console.log(getBasket[0].cyOrderID);
  useEffect(()=>{
      if(zarrinStatus==='OK'){
        verifyPayment()

console.log('ok');
      }else if(zarrinStatus==='NOK'){
        alertA()
      }
},[zarrinStatus])

console.log(zarrinStatus);
  return (
    <div className='container'>

      <div className={`row ${style.row}` } >

        <div className={`col text-center ${style.detail_div} boxSh`}>



<div>
  xzczxc
</div>
        </div>
      </div>
    </div>
  )
}
