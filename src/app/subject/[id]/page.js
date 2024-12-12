'use client'
import CardSub from '@/components/madules/Cards/CardSub/CardSub'
import Subjects from '@/components/templatess/Subject/Subjects'
import apiUrl from '@/utils/ApiUrl/apiUrl'
import React, { useEffect, useState } from 'react'
import style from '../subjectPage.module.css'

export default function SubjectDetail({params}) {

  const [subjectDetail,setSubjectDetail]=useState([])
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
getAllSubject()
  },[params.id])
    console.log(params);
  return (

<div className='container'>
  <div className='row'>


    <div className='col-lg-8 boxSh p-3 mt-5'>
    <article>
        <Subjects subjectDetail={subjectDetail} param={params.id}/>
    </article>
    </div>

    <div className={`col-lg-4 boxSh p-3 mt-5 centerc ${style.allsubject}`}  >

      {allSubjects?.length!=0 && allSubjects?.map((item=>(
        <CardSub item={item}/>
      )))}
    </div>

  </div>
</div>


  )
}
