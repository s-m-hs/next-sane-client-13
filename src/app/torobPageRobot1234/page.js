'use client'
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
       let getLocalStorage=localStorage.getItem('logintoken')
        const res=await fetch(`https:sapi.sanecomputer.com/api/CyProducts/getAllProducts`,{
            method:'POST',
            headers: {
                Authorization: `Bearer ${getLocalStorage}`,
                "Content-Type": "application/json",
              },
              body:JSON.stringify(obj)
        }).then(res=>{
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
