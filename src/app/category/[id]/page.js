import CategoryDetaile from '@/components/templatess/Category/CategoryDetaile'
import React from 'react'

export const metadata = {
  title: " دسته بندی محصولات کامپیوترصانع",
  description: " Sane Anformatic Collection",
 
};

export default function CategortDetail({params}) {
  return (
   <CategoryDetaile param={params.id}/>
  )
}
