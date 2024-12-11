import React from 'react'
import style from './Subjects.module.css'

export default function Subjects({subjectDetail}) {
  return (

    <div className='container mt-5'>
      <div className='row'>
          <div className={`${style.col} col`}  dangerouslySetInnerHTML={{__html:`${subjectDetail?.body}`}}>
    </div>
      </div>
    </div>
  
  )
}
