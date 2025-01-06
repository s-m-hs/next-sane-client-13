import React from 'react'
import Styles from './CardBrand.module.css'
import Link from 'next/link'
export default function CardBrand({src,aos,fileRoot,url}) {
  return (
    <div  className={`col-6 col-md-2 ${Styles.divvv}`} >
      <Link href={`${url}` } target="_blank" rel="noopener noreferrer">
      
      <img data-aos={aos} src={`../../../../../images/brand/${fileRoot}/${src}`} alt={`${src}`} />
      </Link>
    
    </div>
  )
}
