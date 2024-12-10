import React from 'react'
import ProductDetail from '@/components/templatess/ProductDetail/ProductDetail'
export const metadata = {
  title: " جزيیات محصول کامپیوترصانع",
  description: " Sane Anformatic Collection",
  // icons: {
  //   icon: "../../images/photo_2024-05-30_19-08-29.jpg",
  // },
};
export default function ProductPage({params}) {
  return (
<ProductDetail param={params.id}/>
)
}
