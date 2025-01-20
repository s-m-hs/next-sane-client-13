import CategoryDetaile from '@/components/templatess/Category/CategoryDetaile'
import React from 'react'

export const metadata = {
  title: " دسته بندی محصولات کامپیوترصانع",
  description: " دسته بندی محصولات کامپیوتر صانع : شامل دسته بندیهای لوازم جانبی و سخت افزار می باشد",
 
};

export default function CategortDetail({params}) {
  return (
   <CategoryDetaile param={params.id}/>
  )
}
