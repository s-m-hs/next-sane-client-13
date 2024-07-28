import React, { useState } from 'react'
import Styles from './CardsA.module.css'
import Link from 'next/link'
export default function CardA({imgSrc,category,id,changeIdProp}) {

  
  return (
    <div data-aos="fade-up"  className= {`${Styles.cardcat_container} centerc`}>

 <Link className={`${Styles.circle_wrapper} centerc`}
  href={category ? `${category}/${id}` : ''} onClick={changeIdProp} >
<img className={Styles.cardcat__img} src={imgSrc} alt="" />

    <div className={`${Styles.success} `} >
        
    </div>

   </Link> 






    </div>
  )
}
