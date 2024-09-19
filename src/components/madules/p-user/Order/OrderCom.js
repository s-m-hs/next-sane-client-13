'use client'
import React, { useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import style from './OrderCom.module.css'
import { MainContext } from '@/context/MainContext';
import { useForm } from "react-hook-form";
import { IdentificationBadge,IdentificationCard,UserCircle ,DeviceMobile ,EnvelopeSimple ,CheckCircle,CheckFat,Asterisk   } from "@phosphor-icons/react";
import { useRouter } from 'next/navigation';
import apiUrl from '@/utils/ApiUrl/apiUrl';
import alertN from '@/utils/Alert/AlertA';
export default function OrderCom() {
  let{setXtFlagSpinnerShow}=useContext(MainContext)
  useEffect(()=>{
    setXtFlagSpinnerShow(false)
  },[])
  return (
    
    <div >
    <Tabs
defaultActiveKey="home"
id="fill-tab-example"
className="mb-2"
// fill
// onSelect={ffc}
// onClick={()=>ffc(id)}
>
<Tab eventKey="home" title="  لیست سفارشات" style={{ background: 'inherit' }}>
<div className={`container ${style.container}`}>
<div className={ `row ${style.row}`}>

<div className={`col ${style.col} boxSh` }>

{/* <div className={`col ${style.col_button}`} >


</div> */}




</div>



</div>


</div>

{/* </Tab>
<Tab eventKey="address" title="آدرس" style={{ background: 'inherit' }}> */}


</Tab>

</Tabs>
</div>
  )
}
