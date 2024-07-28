import React from 'react'
import Styles from './CardBrand.module.css'
export default function CardBrand({src,aos,fileRoot}) {
    console.log(src)
  return (
    <div  className={Styles.div} data-aos={aos}>
        <img src={`../../../../../images/brand/${fileRoot}/${src}`} alt="" />
    </div>
  )
}
