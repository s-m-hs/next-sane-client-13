import React from 'react'
import style from './BanerA.module.css'
import SwiperG from '@/components/templatess/Home/SwiperG/SwiperG'

export default function BanerA() {
  return (
    <div className='contaner'>
        <div className='row '>
            <div className={ ` col ${style.main_div} mt-5`}  >
                <div className={style.div}>
                    <SwiperG/>
                </div>

            </div>
        </div>
    </div>
  )
}
