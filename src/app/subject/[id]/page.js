'use client'
import CardSub from '@/components/madules/Cards/CardSub/CardSub'
import Subjects from '@/components/templatess/Subject/Subjects'
import apiUrl from '@/utils/ApiUrl/apiUrl'
import React, { useContext, useEffect, useState } from 'react'
import style from '../subjectPage.module.css'
import { MainContext } from '@/context/MainContext'

export default function SubjectDetail({params}) {
  let {setXtFlagSpinnerShow}=useContext(MainContext)

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
    useEffect(()=>{
      setXtFlagSpinnerShow(false)
    },[])
  return (

<div className='container'>
  <div className='row'>


    <div className='col-xxl-8 boxSh p-3 mt-5'>
    <article>
        <Subjects subjectDetail={subjectDetail} param={params.id}/>
    </article>
    </div>

    <div className={`col-xxl-4 boxSh p-3 mt-5 centerc ${style.allsubject}`}  >

      {allSubjects?.length!=0 && allSubjects?.map((item=>(
        <CardSub item={item}/>
      )))}
    </div>

  </div>
</div>


  )
}
