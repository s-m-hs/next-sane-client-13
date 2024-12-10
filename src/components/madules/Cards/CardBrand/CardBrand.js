import React from 'react'
import Styles from './CardBrand.module.css'
export default function CardBrand({src,aos,fileRoot}) {
  return (
    <div  className={`col-6 col-md-2 ${Styles.divvv}`} >
        <img data-aos={aos} src={`../../../../../images/brand/${fileRoot}/${src}`} alt={`${src}`} />
    </div>
  )
}
