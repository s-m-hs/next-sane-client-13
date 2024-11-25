import React from 'react'
import style from './BanerA.module.css'
import SwiperG from '@/components/templatess/Home/SwiperG/SwiperG'

export default function BanerA() {
  return (
    <div className='contaner'>
        <div className={ `row ${style.row} mt-5`} >
          <div className='col-lg-10'>
          <div class={`${style.text_container}`} >
    <div>مشاوره ، فروش و اسمبل </div>
    <div>انواع سیستم های </div>
    <div>خانگی  اداری گیمینگ و مهندسی</div>
    <div>مطابق با نیاز کاربر</div>
    <div>
      {/* در کمترین زمان ممکن */}
      
    </div>
    <span className={style.div_swiper}>
    <SwiperG />

    </span>

</div>        

  </div>
            <div className={ ` col-2 ${style.main_div} mt-5`}  >
                <div className={style.div}>
                    <SwiperG/>
                </div>

            </div>
        </div>
    </div>
  )
}
