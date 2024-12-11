import React from 'react'

export default function Subjects({subjectDetail}) {
  return (
    <div dangerouslySetInnerHTML={{__html:`${subjectDetail?.body}`}}>


    </div>
  )
}
