import React from "react";

import SwiperProduct from "../SwiperProduct/SwiperProduct";
import Styles from './ProductDetailLeft.module.css'


export default function ProductDetailLeft({detail}) {
  return (
    <div className="container " style={{ height: '600px' }}>
      <div className="row mt-1" style={{ height: '600px' }}>
        {detail && 
        <>
          <div className="col-6">
          <div className={`${Styles.ProductDetailL_divright} centerc mt-5`}>



            <span className={Styles.ProductDetailL_div__title} >{detail.name}</span>
            <span className={Styles.ProductDetailL_div__description}  >{detail.description}</span>
            {/* <span className={Styles.ProductDetailL_div__partn}  >پارت نامبر: 90MP03F0-BMUA00</span> */}
            <div className={`${Styles.ProductDetailL_detail} centerc mt-5`}>
{detail.spec?.slice(0,3).map(item=> 
   <span> {`${item.name} : ${item.value}`}</span>
 )
}

              {/* <span>درگاه اتصال: بلوتوث - دانگل - پورت USB</span>
              <span>محدوده دقت حسگر: 100-36000 نقطه بر اینچ</span>
              <span>نوع حسگر: ROG AimPoint</span>
              <span>سرعت رد‌گیری: 650 اینچ بر ثانیه</span> */}
            </div>
            <div className={`${Styles.ProductDetailL_divMiddle} centerc mt-5`} >

              <span className={Styles.ProductDetailL_divMiddle_offprice} >{detail.price?.toLocaleString()} ریال</span>
              <span className={Styles.ProductDetailL_divMiddle_price}  >{detail.noOffPrice?.toLocaleString()} ریال</span>
              <span className={Styles.ProductDetailL_divMiddle_count} >موجودی محصول: موجود</span>
            </div>
            <div className={`${Styles.ProductDetailL_left} centerc mt-5`} >
              <button className="btn btn-primary ">افزودن به سبد خرید</button>

            </div>

          </div>
        </div>

        <div className="col-6">
          <SwiperProduct src={detail.mainImage} />
        </div>
        </>
        }

      

      </div>
      {/* 
      <div className="row "style={{height:'200px'}}>
        <div className="col-md-6">
          <div className={`${Styles.ProductDetailL_divright} centerc mt-5`}>
   


<span className={Styles.ProductDetailL_div__title} >موس بی سیم گیمینگ ایسوس AimPoint EVA-02 Edition</span>
<span className={Styles.ProductDetailL_div__description}  >ASUS ROG Gladius III Wireless AimPoint EVA-02 Edition Gaming Mouse</span>
<span className={Styles.ProductDetailL_div__partn}  >پارت نامبر: 90MP03F0-BMUA00</span>
<div className={`${Styles.ProductDetailL_detail} centerc mt-5`}> 
  <span>درگاه اتصال: بلوتوث - دانگل - پورت USB</span>
<span>محدوده دقت حسگر: 100-36000 نقطه بر اینچ</span>
<span>نوع حسگر: ROG AimPoint</span>
<span>سرعت رد‌گیری: 650 اینچ بر ثانیه</span>
</div>

          </div>
        </div>
        <div className="col-md-2">

<div className={`${Styles.ProductDetailL_divMiddle} centerc mt-5`} >

  <span className={Styles.ProductDetailL_divMiddle_offprice} >6,950,000 تومان</span>
  <span className={Styles.ProductDetailL_divMiddle_price}  >7,445,000 تومان</span>
  <span className={Styles.ProductDetailL_divMiddle_count} >موجودی محصول: موجود</span>
</div>

        </div>
        <div className="col-md-4">

          <div className={`${Styles.ProductDetailL_left} centerc mt-5`} >
<button className="btn btn-primary ">افزودن به سبد خرید</button>

          </div>
        </div>
      </div> */}
    </div>


  );
}
