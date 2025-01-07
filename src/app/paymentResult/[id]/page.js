'use client'

import { MainContext } from '@/context/MainContext'
import alertQ from '@/utils/Alert/AlertQ'
import { useRouter } from 'next/navigation'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import style from './payment.module.css'
import apiUrl from '@/utils/ApiUrl/apiUrl'
import alertN from '@/utils/Alert/AlertA'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import PaymentResultCom from '@/components/templatess/PaymentResultCom/PaymentResultCom'

export default function Payment({params}) {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentResultCom param={params.id}/>
    </Suspense>


   )
}
