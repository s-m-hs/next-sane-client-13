
import React from 'react'
import Styles from './BrandArea.module.css'
import CardBrand from '../Cards/CardBrand/CardBrand'
export default function BrandArea({brandArray,fileRoot}) {
const brandLogo=[
    'A4.jpg','rapoo.jpg','razer.jpg','tesco.jpg','proone.jpg','Logitech-Symbol.png'
]
  return (
    <div className={`container ${Styles.container }`}  >
        <div className='row '>
           
                {brandArray.map((item,index)=>
             <CardBrand key={index} src={item} fileRoot={fileRoot}  aos={'fade-right'}/>  
                )}

            
        </div>
    </div>
  )
}
