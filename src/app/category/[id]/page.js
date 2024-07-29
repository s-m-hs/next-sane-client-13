import CategoryDetaile from '@/components/templates/Category/CategoryDetaile'
import React from 'react'

export default function CategortDetail({params}) {
  return (
   <CategoryDetaile param={params.id}/>
  )
}
