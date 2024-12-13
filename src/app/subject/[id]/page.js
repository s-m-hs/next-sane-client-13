'use client'
import CardSub from '@/components/madules/Cards/CardSub/CardSub'
import Subjects from '@/components/templatess/Subject/Subjects'
import apiUrl from '@/utils/ApiUrl/apiUrl'
import React, { useContext, useEffect, useState } from 'react'
import style from '../subjectPage.module.css'
import { MainContext } from '@/context/MainContext'
import { usePathname } from 'next/navigation'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { HouseLine,Notepad} from "@phosphor-icons/react";
import Link from 'next/link'
export default function SubjectDetail({params}) {
  let {setXtFlagSpinnerShow}=useContext(MainContext)

  const [subjectDetail,setSubjectDetail]=useState([])
  const[allSubjects,setAllSubjects]=useState([])
const pathname=usePathname()
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
              // console.log(res)
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
    // console.log(res)
    if(res.ok){
      return res.json()
    }
  }).then(resullt=>{
    // console.log(resullt)
    setSubjectDetail(resullt)
  })
}
myApp()
  }

  useEffect(()=>{
getsubjectDetail()
getAllSubject()

  },[params.id])
    // console.log(params);
    useEffect(()=>{
      setXtFlagSpinnerShow(false)
    },[])

    useEffect(()=>{
      if(pathname===`/subject/${params.id}`){
        setXtFlagSpinnerShow(false)

      }
    })
    // console.log(pathname);
  return (

<div className='container'>
  <div className='row'>

  <div className={`row mt-3 ${style.breadcrumb_row}`} >
  <div className={`${style.breadcrumb} col` } >
    <Breadcrumb>
    <Breadcrumb.Item >
    <Link 
    // onClick={()=>setXtFlagSpinnerShow(true)}
 href="/"><HouseLine size={24} color="#24b8c9de"/>خانه/</Link>
 
 <Link 
    // onClick={()=>setXtFlagSpinnerShow(true)}
 href="/subject"><Notepad size={24} color="#24b8c9de"/>مقالات/</Link>
 </Breadcrumb.Item>
      <Breadcrumb.Item active href="/">
        {subjectDetail?.title}
      </Breadcrumb.Item>
    </Breadcrumb>
  </div>
</div>
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
