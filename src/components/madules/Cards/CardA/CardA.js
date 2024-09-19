'use client'
import React, { useContext, useState } from 'react'
import Styles from './CardsA.module.css'
import Link from 'next/link'
import { MainContext } from '@/context/MainContext'



export default function CardA({imgSrc,category,id,click,text}) {
let{setXtFlagSpinnerShow}=useContext(MainContext)

  
  return (
    <div
    // data-aos='zoom-in-up'

    data-aos="fade-up"
      className= {`${Styles.cardcat_container} centerc`}
   
    >

 <Link
 onClick={()=>setXtFlagSpinnerShow(true)}
  className={`${Styles.circle_wrapper} centerc`}
  href={category ? `${category}/${id}` : ''}  >
<img className={Styles.cardcat__img} src={imgSrc} alt="" />

    <div className={`${Styles.success} `} >
        
    </div>
   </Link> 
   <span className={`${Styles.cardcat__span} `}>{text}</span>

    </div>
  )
}
