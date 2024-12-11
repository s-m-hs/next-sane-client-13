'use client'
import apiUrl from '@/utils/ApiUrl/apiUrl'
import React, { useContext, useEffect, useState } from 'react'
import style from './SubjecArea.module.css'
import CardSub from '../Cards/CardSub/CardSub'
import { MainContext } from '@/context/MainContext'

export default function SubjecArea() {
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
console.log(allSubjects);  
useEffect(()=>{
    getAllSubject()
},[])

  return (
    <div className={`container ${style.container} boxSh `}>
        
        <div className={`row row-cols-auto  ${style.row} centerr`}>
            {allSubjects?.length!=0 && allSubjects.map(item=>(
                <CardSub item={item} 
/>
            ))}
        </div>
    </div>
  )
}
