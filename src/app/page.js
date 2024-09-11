'use client'
import BrandArea from '@/components/madules/BrandArea/BrandArea';
import SwiperC from '@/components/madules/Swiper/SwiperC/SwiperC';
import CategorySectionA from '@/components/templates/Home/CategorySectionA/CategorySectionA';
import SwiperB from '@/components/templates/Home/SwiperB/SwiperB';
import { MainContext } from '@/context/MainContext';
import alertN from '@/utils/Alert/AlertA';
import updateBasket from '@/utils/ApiUrl/updateBasket';
// import getLocalStorage from '@/utils/localStorag/localStorage';
import { useContext, useEffect } from 'react';

export default function Home() {
  let { setXtFlagSpinnerShow, xtFlagLogin, localUpdateBasket, setLocalUpdateBasket,setCartCounter,setBasketFlag } = useContext(MainContext);
  const alertA=()=>alertN('center','success',"محصولات با موفقیت به سبد خرید شما اضافه شد",500)
  // const getLocalStorage=localStorage.getItem('loginToken')

  const sliderDetail=[
    {img:"../../../images/products/c8f4ce37fea7a15300a2264c73b4ccd925d20dac_1697010738.jpg",title:'هدفون بی سیم',price:'327,000'},
    {img:"../../../images/products/d2c991565182fb5bdc10abd2576e454d9f54ad10_1685442773.jpg",title:' موس A4Teach ',price:'468,000'},
    {img:"../../../images/products/اسپیکر-شارژی-و-بلوتوثی-بیکارو-Beecaro-GF403-1.jpg",title:' اسپیکرشارژی Tsco',price:'1,035,000'},
    {img:"../../../images/products/2-2.jpg",title:'فلش Silicon Power 32G  ',price:'327000'},
    {img:"../../../images/products/photo_2024-06-05_11-57-13.jpg",title:'فندکی ProOne 4511',price:'225,000'},
    {img:"../../../images/products/cc742884e4d73df3da5ac70491a84e171361a061_1688487305.jpg",title:'پایه موبایل HunKi',price:'535,000'},
    {img:"../../../images/products/45f44d125ebd0405d6f4827b2a47f5674c0eef09_1640430945.jpg",title:'هدفون بی سیم Tsco',price:'836,000'},
    {img:"../../../images/products/04892b84e1c0f235822724ff6e92c4d55ca7523d_1707223995.jpg",title:' ایرپاد Samsung ',price:'935,000'},
  ]
  const sliderDetail2=[
    {img:"../../../images/products/mypass.jpg",title:'MyPass 1T',price:'3,320,000'},
    {img:"../../../images/products/spower2t.jpg",title:'Silicon Power 2T',price:'5,360,000'},
    {img:"../../../images/products/980proo.jpg",title:'nvme pro 980 512G  ',price:'3,270,000'},
    {img:"../../../images/products/adata.jpg",title:'  adata 2t ',price:'4,680,000'},
    {img:"../../../images/products/modemtp.jpg",title:'TPlink 9960',price:'1,327000'},
    {img:"../../../images/products/green aria.jpg",title:'Green Aria',price:'2,225,000'},
    {img:"../../../images/products/lexar 512.jpg",title:'Lexar 512g',price:'2,335,000'},
    {img:"../../../images/products/main610.jpg",title:'ASUS H610 MA-WIFI',price:'5,320,000'},
    {img:"../../../images/products/12400 tray.jpg",title:' intel 12400 ',price:'7,935,000'},]
    const brandLogA=[
      'A4.jpg','rapoo.jpg','razer.jpg','tesco.jpg','proone.jpg','logitech.jpg'
  ]
  const brandLogoB=[
    'asus.jpg','sp.jpg','wd.jpg','samsung.jpg','giga.jpg','coolermaaster.jpg'
]
useEffect(() => {
  const getLocalStorage=localStorage.getItem('loginToken')
  if(xtFlagLogin){
      for (let i = 0; i < localStorage.length; i++) {

    const key = localStorage.key(i);
    if (key.startsWith('cartObj')) {
      const keyy=JSON.parse(localStorage.getItem(key))
      const value = localStorage.getItem(key);
      let obj=[{
        cyProductID:keyy.value,
        quantity: keyy.quan
      }] 
      updateBasket(getLocalStorage,obj,setBasketFlag,alertA)
      localStorage.removeItem(key)
      setLocalUpdateBasket([])
      setCartCounter(0)
      // apiCallProdDetails(value, addItem, setIsApiCalled)
    }
  }
  }

},[xtFlagLogin]); 
  return (
<div className='container'>
  <div className='row'>
    <div className='col-12'><SwiperB/></div> 
    <CategorySectionA/>
  <BrandArea brandArray={brandLogA} fileRoot={'1'}  />
    <SwiperC  title={'پرفروش ترین ها :'} sliderDetailProp={sliderDetail}/>
    <CategorySectionA/>
    <BrandArea brandArray={brandLogoB} fileRoot={'2'} />
    <SwiperC   title={'پرفروش ترین های سخت افزار :'} sliderDetailProp={sliderDetail2}/>


    </div>
    </div>
   );
}
