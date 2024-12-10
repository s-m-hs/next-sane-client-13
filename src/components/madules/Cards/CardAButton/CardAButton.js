import React, { useState } from 'react'
import Styles from './CardAButton.module.css'
export default function CardAButton({imgSrc,changeIdProp,text}) {  
  return (
    <div className= {`${Styles.cardcat_container} centerc`}>

 <button className={`${Styles.circle_wrapper} centerc`}
onClick={changeIdProp} >
<img className={Styles.cardcat__img} src={imgSrc} alt={`${text}`} />

    <div className={`${Styles.success} `} >
        
    </div>

   </button> 






    </div>
  )
}
