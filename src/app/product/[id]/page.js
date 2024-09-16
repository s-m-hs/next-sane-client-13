import React from 'react'
import ProductDetail from '@/components/templatess/ProductDetail/ProductDetail'

export default function ProductPage({params}) {
  return (
<ProductDetail param={params.id}/>
)
}
