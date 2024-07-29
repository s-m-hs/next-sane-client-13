import CategoryDetaile from '@/components/templates/Category/CategoryDetaile'
import React from 'react'

export default function CategortDetail({params}) {
    console.log(params.id)
  return (
   <CategoryDetaile param={params.id}/>
  )
}
