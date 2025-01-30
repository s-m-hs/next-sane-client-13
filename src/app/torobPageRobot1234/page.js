'use client'
import apiUrl from '@/utils/ApiUrl/apiUrl'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [product,setProduct]=useState([])
    let obj={
            
        cat: "string",
        pageNumber: 0,
        pageSize: 1000000
      
}
    async function myApp(){
        const getLocalStorage=localStorage.getItem('loginToken')
        const res=await fetch(`${apiUrl}/api/CyProducts/getAllProducts`,{
            method:'POST',
            headers: {
                Authorization: `Bearer ${getLocalStorage}`,
                "Content-Type": "application/json",
              },
              body:JSON.stringify(obj)
        }).then(res=>{
            console.log(res)
            if(res.ok){
                return res.json().then(result=>{
                    console.log(result)
                    setProduct(result.itemList)
                })
            }
        })
      }
     
useEffect(()=>{
 myApp()
 console.log(product) 
},[]) 
  return (
    <div>
        {product.length!=0 && product?.map((item)=>(
            <>
                        <Link href={`/product/${item.id}`}>{`/product/${item.id}`}</Link><hr/>

            </>
        ))}
    </div>
  )
}
