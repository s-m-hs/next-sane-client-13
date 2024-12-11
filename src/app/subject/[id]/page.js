'use client'
import Subjects from '@/components/templatess/Subject/Subjects'
import apiUrl from '@/utils/ApiUrl/apiUrl'
import React, { useEffect, useState } from 'react'

export default function SubjectDetail({params}) {

  const [subjectDetail,setSubjectDetail]=useState([])
  
  
  const  getsubjectDetail=()=>{
    const getLocalStorage=localStorage.getItem('loginToken')
async function myApp(){
  const res=await fetch(`${apiUrl}/api/CySubjects/${params.id}`,{
    method:'GET', 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLocalStorage}`,
    },
  }).then(res=>{
    console.log(res)
    if(res.ok){
      return res.json()
    }
  }).then(resullt=>{
    console.log(resullt)
    setSubjectDetail(resullt)
  })
}
myApp()
  }

  useEffect(()=>{
getsubjectDetail()
  },[params.id])
    console.log(params);
  return (

<div className='container'>
  <div className='row'>

    <div className='col-lg-3 boxSh p-3 mt-5'></div>

    <div className='col-lg-9 boxSh p-3 mt-5'>
    <article>
        <Subjects subjectDetail={subjectDetail} param={params.id}/>
    </article>
    </div>

  </div>
</div>


  )
}
