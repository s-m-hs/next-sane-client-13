import React from 'react'
import Styles from './CategoryProducts.module.css'
import CardC from '@/components/madules/Cards/CardC/CardC'
export default function CategoryProducts() {
    const sliderDetail=[
        {img:"../../../images/products/c8f4ce37fea7a15300a2264c73b4ccd925d20dac_1697010738.jpg",title:'هدفون بی سیم',price:'327,000'},
        {img:"../../../images/products/d2c991565182fb5bdc10abd2576e454d9f54ad10_1685442773.jpg",title:' موس A4Teach ',price:'468,000'},
        {img:"../../../images/products/اسپیکر-شارژی-و-بلوتوثی-بیکارو-Beecaro-GF403-1.jpg",title:' اسپیکرشارژی Tsco',price:'1,035,000'},
        {img:"../../../images/products/2-2.jpg",title:'فلش Silicon Power 32G  ',price:'327000'},
        {img:"../../../images/products/photo_2024-06-05_11-57-13.jpg",title:'فندکی ProOne 4511',price:'225,000'},
        {img:"../../../images/products/cc742884e4d73df3da5ac70491a84e171361a061_1688487305.jpg",title:'پایه موبایل HunKi',price:'535,000'},
        {img:"../../../images/products/45f44d125ebd0405d6f4827b2a47f5674c0eef09_1640430945.jpg",title:'هدفون بی سیم Tsco',price:'836,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
        {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
      ]
  return (
    <div className='container'>
<div className={`row row-cols-4 centerr ${Styles.products_card}`}>


  {sliderDetail.map((item,index)=>
    <div key={index} className={`col  centerc ${Styles.products_col}`} >
      <CardC 
      
    imgSrc={item.img} title={item.title} price={item.price}
    
    /></div>

  )}

{/* <div className='col'><CardProB/></div>
<div className='col'><CardProB/></div>
<div className='col'><CardProB/></div>
<div className='col'><CardProB/></div>
<div className='col'><CardProB/></div> */}


   

</div>

    </div>
  )
}
