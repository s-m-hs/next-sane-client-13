import CategoryDetaile from '@/components/templatess/Category/CategoryDetaile'
import React from 'react'

export const metadata = {
  title: " دسته بندی محصولات کامپیوترصانع",
  description: " Sane Anformatic Collection",
  icons: {
    icon: "../../images/photo_2024-05-30_19-08-29.jpg",
  },
};

export default function CategortDetail({params}) {
  return (
   <CategoryDetaile param={params.id}/>
  )
}
