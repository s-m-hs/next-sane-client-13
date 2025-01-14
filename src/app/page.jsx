'use client'
import dynamic from 'next/dynamic'
const SwiperC = dynamic(() => import('@/components/madules/Swiper/SwiperC/SwiperC'), { ssr: false })
const CategorySectionA = dynamic(() => import('@/components/templatess/Home/CategorySectionA/CategorySectionA'), { ssr: false })
const BrandArea = dynamic(() => import('@/components/madules/BrandArea/BrandArea'), { ssr: false })
const BanerA = dynamic(() => import('@/components/madules/Baner/BanerA'), { ssr: false })


// import BanerA from '@/components/madules/Baner/BanerA';
// import BrandArea from '@/components/madules/BrandArea/BrandArea';
// import SwiperC from '@/components/madules/Swiper/SwiperC/SwiperC';
// import CategorySectionA from '@/components/templatess/Home/CategorySectionA/CategorySectionA';
import SwiperB from '@/components/templatess/Home/SwiperB/SwiperB';
import SwiperF from '@/components/templatess/Home/SwiperF/SwiperF';
import SwiperG from '@/components/templatess/Home/SwiperG/SwiperG';
import VerticalSlideshow from '@/components/templatess/Home/VerticalSlideshow/VerticalSlideshow';
import { MainContext } from '@/context/MainContext';
import alertN from '@/utils/Alert/AlertA';
import updateBasket from '@/utils/ApiUrl/updateBasket';
import { usePathname } from 'next/navigation';

// import getLocalStorage from '@/utils/localStorag/localStorage';
import { use, useContext, useEffect, useState } from 'react';
import SubjecArea from '@/components/madules/SubjecArea/SubjecArea';
import apiUrl from '@/utils/ApiUrl/apiUrl'

export default function Home() {
  const pathname = usePathname();

  let { xtflagSpinnerShow,setXtFlagSpinnerShow, xtFlagLogin, localUpdateBasket, setLocalUpdateBasket,setCartCounter,setBasketFlag } = useContext(MainContext);
  const alertA=()=>alertN('center','success',"محصولات با موفقیت به سبد خرید شما اضافه شد",500)
  // const getLocalStorage=localStorage.getItem('loginToken')
const [key,setKey]=useState('')
const [keyOfferSlider,setKeyOfferSlider]=useState('')

    const brandLogA=[
      {id:1,brand:'A4.jpg',url:'https://www.a4tech.com/'},
      {id:2,brand:'rapoo.jpg',url:'https://www.rapoo-eu.com/'},
      {id:3,brand:'razer.jpg',url:'https://www.razer.com/'},
      {id:4,brand:'tesco.jpg',url:'https://tsco.ir/'},
      {id:5,brand:'earldom.jpg',url:'https://www.earldom.com/'},
      {id:6,brand:'Logitech-Symbol.png',url:'https://www.logitech.com/'},
      // 'A4.jpg','rapoo.jpg','razer.jpg','tesco.jpg','proone.jpg','logitech.jpg'
  ]
  const brandLogoB=[
    {id:1,brand:'asus.jpg',url:'https://www.asus.com/'},
    {id:2,brand:'sp.jpg',url:'https://www.silicon-power.com/web//'},
    {id:3,brand:'wd.jpg',url:''},
    {id:4,brand:'samsung.jpg',url:'https://www.samsung.com/us/'},
    {id:5,brand:'giga.jpg',url:'https://www.gigabyte.com/'},
    {id:6,brand:'green.png',url:'https://green.ir/'},
    // 'asus.jpg','sp.jpg','wd.jpg','samsung.jpg','giga.jpg','coolermaaster.jpg'
]

console.log(keyOfferSlider?.value)

const keyShow=(id,func)=>{
  const getLocalStorage=localStorage.getItem('loginToken')

  async function myApp(){
    const res=await fetch(`${apiUrl}/api/CyKeyDatas/${id}`,{
      method:'GET',
      headers: {
        Authorization: `Bearer ${getLocalStorage}`,
        "Content-Type": "application/json",
      },

    }).then(res=>{
      if(res.ok){
        return res.json().then(result=>{
          console.log(result)
          func((result))
        })

      }
      
    })
  }myApp()
} 

useEffect(()=>{
  keyShow(11,setKey)
  keyShow(14,setKeyOfferSlider) 
},[])
// useEffect(() => {
//   const getLocalStorage=localStorage.getItem('loginToken')
//   if(xtFlagLogin){
//       for (let i = 0; i < localStorage.length; i++) {

//     const key = localStorage.key(i);
//     if (key.startsWith('cartObj')) {
//       const keyy=JSON.parse(localStorage.getItem(key))
//       const value = localStorage.getItem(key);
//       let obj=[{
//         cyProductID:keyy.value,
//         quantity: keyy.quan
//       }] 
//       updateBasket(getLocalStorage,obj,setBasketFlag,alertA)
//       localStorage.removeItem(key)
//       setLocalUpdateBasket([])
//       setCartCounter(0)
//       // apiCallProdDetails(value, addItem, setIsApiCalled)
//     }
//   }
//   }

// },[xtFlagLogin]); 



// useEffect(()=>{
//   setXtFlagSpinnerShow(false)
// },[])

// useEffect(()=>{
//   if(  pathname==='/'){
//     setXtFlagSpinnerShow(false)
//   }
// },[xtflagSpinnerShow])

  return (
<div className='container'>
  <div className='row '>
    <div className='col-lg-8 home-swiperB-col'>
      <SwiperB/></div> 
    <div className='col-4 home-miniSwiper'>
      <VerticalSlideshow/>
      <SwiperF/>
   
     </div> 
     {keyOfferSlider?.value==='1' && <SwiperC categoryCode='offer-best-sellers' title={'پرفروشهای فروش ویژه💰:'} />} 

    <CategorySectionA title='لوازم جانبی' categoryId={3}/>
  <BrandArea brandArray={brandLogA} fileRoot={'1'}  />
    <SwiperC categoryCode='best-sellers' title={'پرفروش ترین ها :'} />
<div  className='mobile-swiperf'>
   <SwiperF/>
</div>
   

    <SubjecArea /> 
    <CategorySectionA title='سخت افزار' categoryId={2}/>
    <BrandArea brandArray={brandLogoB} fileRoot={'2'} />
    {key?.tag === 'ok'  ? 
     <SwiperC  categoryCode='hardwairebestseller' title={'پرفروش ترین های سخت افزار :'} />
  :''} 
    <BanerA  />
  
 
    </div>
    </div>
   );
}
