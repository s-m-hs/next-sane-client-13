import React from 'react'
import ProductDetail from '@/components/templates/ProductDetail/ProductDetail'

export default function ProductPage({params}) {
  return (
<ProductDetail param={params.id}/>
)
}
