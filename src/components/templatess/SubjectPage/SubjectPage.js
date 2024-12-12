'use client'
import dynamic from 'next/dynamic'
const TypeIt = dynamic(() => import('typeit-react'), { ssr: false })
import React, { useEffect, useState } from 'react'
import apiUrl from '@/utils/ApiUrl/apiUrl'
import style from './SubjectPage.module.css'
// import TypeIt from "typeit-react";
import Link from 'next/link';

export default function SubjectPage() {
    const[allSubjects,setAllSubjects]=useState([])
    
      const getAllSubject=()=>{
          const getLocalStorage=localStorage.getItem('loginToken')
          async function myApp(){
              const res=await fetch(`${apiUrl}/api/CySubjects`,{
                  method:'GET',
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${getLocalStorage}`,
                    },
              }).then(res=>{
                  console.log(res)
                  if(res.ok){
                   return   res.json()
                  }
              }
      
              ).then(result=>{
                  setAllSubjects(result)
              })
          }
          myApp() 
      }
console.log(allSubjects)
      useEffect(()=>{
        getAllSubject()
},[]) 
  return (
    <div className='container'>
      
      <div className={`row ${style.row }`}>
{allSubjects?.length!=0 && allSubjects.map((item)=>(
    <div className='col-12 boxSh m-5 p-5'>
        <Link href={`/subject/${item.id}`}>
        <img src= {item.bigImg} alt="" /> 
 <div className="App">
            <TypeIt
                options={{
                  strings: [`${item.describtion}`],
                  speed: 20,
                  loop:true,
                    waitUntilVisible: true,
                    deleteSpeed:40
                }}
            />
        </div>
        </Link>

    </div>
   
))}
        
      </div>
    </div>
  )
}
