'use client'

import { MainContext } from '@/context/MainContext'
import alertQ from '@/utils/Alert/AlertQ'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import style from './PaymentResultCom.module.css'
import apiUrl from '@/utils/ApiUrl/apiUrl'
import alertN from '@/utils/Alert/AlertA'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';

export default function PaymentResultCom({param}) {

  const searchParams = useSearchParams();
    
  const authority = searchParams.get('Authority');
  const status = searchParams.get('Status');
  let {setXtFlagSpinnerShow,zarrinStatus,getBasket}=useContext(MainContext)
  const route=useRouter()
const [verifyDetail,setVerifyDetail]=useState({})

const alertA=()=>alertQ('center','error','تراكنش ناموفق می باشد ...','متوجه شدم ...').then(res=>{
  route.push('/basket')
})
const alertB=()=>alertQ('center','error','مشکلی پیش آمده ...','متوجه شدم ...').then(res=>{
  route.push('/basket')
})
const alertC=()=>alertN('center','success','پرداخت با موفقیت انجام شد','1500')



const verifyPayment=()=>{
  const getLocalStorage = localStorage.getItem("loginToken");
let obj={
  orderId: param,
  authority: authority
}
  // console.log(obj);
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
          setVerifyDetail(result)
          setXtFlagSpinnerShow(false)

        })
      }else{
    //  console.log(JSON.parse(res))  
        
        alertB()

      }
    }).catch(err=>console.log(err))
  }
  myApp()
}
// console.log(getBasket[0].cyOrderID);
  useEffect(()=>{

      if(status==='OK'){
        verifyPayment()

      }else if(status==='NOK'){
        alertA()
      }
},[status])


  useEffect(()=>{
      setXtFlagSpinnerShow(false)
      setVerifyDetail({})

  },[])
  return (

    
    
    <div className='container'>

    <div className={`row ${style.row}` } >

      <div className={`col text-center ${style.detail_div} boxSh`}>



<div>
<table class="table mt-4">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col"> شرح</th>
  
    </tr>
  </thead>
  <tbody className={style.tbody}>
    <tr>
      <th scope="row">وضعیت خرید</th>
      <td>موفق</td>
  
    </tr>
    <tr>
      <th scope="row">کد پیگیری </th>
      <td>{verifyDetail.ref_id}</td>
    
    </tr>
    <tr>
      <th scope="row">message</th>
      <td colspan="2">{verifyDetail.message}</td>
 
    </tr>
  </tbody>
</table>
{/* <ul>
    <li>{verifyDetail?.code}</li>
    <li>{verifyDetail?.fee}</li>
    <li>{verifyDetail?.message}</li>
</ul> */}
</div>
<Link href={'/'}>
<button className='btn btn-warning m-4'>بازگشت به صفحه اصلی</button>
</Link>
      </div>
    </div>
  </div>  )
}
