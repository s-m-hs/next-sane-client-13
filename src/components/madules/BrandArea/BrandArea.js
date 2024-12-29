
import React from 'react'
import Styles from './BrandArea.module.css'
import CardBrand from '../Cards/CardBrand/CardBrand'
export default function BrandArea({brandArray,fileRoot}) {

  return (
    <div className={`container ${Styles.container }`}  >
        <div className='row '>
           
                {brandArray.map((item,index)=>
             <CardBrand key={index} src={item.brand} fileRoot={fileRoot} url={item.url}  aos={'fade-right'}/>  
                )}

            
        </div>
    </div>
  )
}
