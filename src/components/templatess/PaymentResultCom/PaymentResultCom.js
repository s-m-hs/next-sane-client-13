'use client'

import { MainContext } from '@/context/MainContext'
import React, { useContext, useEffect } from 'react'

export default function PaymentResultCom() {

  let {setXtFlagSpinnerShow}=useContext(MainContext)
  

  useEffect(()=>{
      setXtFlagSpinnerShow(false)
},[])

  return (
    <div>PaymentResultCom</div>
  )
}
