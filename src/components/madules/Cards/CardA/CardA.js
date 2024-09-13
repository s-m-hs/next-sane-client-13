'use client'
import React, { useState } from 'react'
import Styles from './CardsA.module.css'
import Link from 'next/link'



export default function CardA({imgSrc,category,id,click,text}) {


  
  return (
    <div
    // data-aos='zoom-in-up'

    data-aos="fade-up"
      className= {`${Styles.cardcat_container} centerc`}
   
    >

 <Link
 onClick={()=>click()}
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
