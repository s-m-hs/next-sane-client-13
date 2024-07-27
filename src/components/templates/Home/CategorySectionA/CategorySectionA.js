'use client'
import React, { useEffect, useState } from 'react'
import CardA from '@/components/madules/Cards/CardA/CardA'
import styles from './CategorySectionA.module.css'
import apiUrl from '@/utils/ApiUrl/apiUrl'

export default function CategorySectionA() {
const [mainCategory,setMainCategory]=useState({}) 



const getCategoryById=()=>{
  let obj={
    gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    id: 2,
    str: "string"
  }
async function myAppGet(){
  const res=await fetch(`${apiUrl}/api/CyCategories/GetItemWChildAndRoot`,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json' 
    },
    body:JSON.stringify(obj)
  }).then(res=>{
    console.log(res)
    return res.json()
  }).then(
    result=>{
      // console.log(result)
      setMainCategory(result)
      console.log(mainCategory)
      
    }
  )
}
myAppGet()
}
// console.log(imgSrcProp); 



////////////////////////////
useEffect(()=>{
  getCategoryById()
  // console.log(mainCategory.childs[0].imageUrl) 
},[])

  return ( 
    // <div className={`container  centerr ${styles.bcatitem}`}  >
        <div className={`row row-cols-6  ${styles.bcatitem}`}  >

{mainCategory.childs &&   mainCategory.childs.map((item,index)=>
  <CardA imgSrc={item.imageUrl} category={`category`} id={item.id}/>

)}

   
  
        </div>

      //  </div>
  )
}
