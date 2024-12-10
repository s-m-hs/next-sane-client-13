'use client'
import Subjects from '@/components/templatess/Subject/Subjects'
import React from 'react'

export default function SubjectDetail({params}) {
    console.log(params);
  return (
    <article>
        <Subjects param={params.id}/>
    </article>
  )
}
