import React from 'react'
import ProductDetail from '@/components/templatess/ProductDetail/ProductDetail'
import apiUrl from '@/utils/ApiUrl/apiUrl'

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = (await params).id
 
  // fetch data
  const product = await fetch(`${apiUrl}/api/CyProducts/${id}`).then((res) => res.json())
  const offerFetch = await fetch(`${apiUrl}/api/CyKeyDatas/13`).then((res) => res.json())
  const offer=Number(offerFetch.value) 

  const productPrice =
  product.noOffPrice !== product.price
    ? product.noOffPrice
    : product.price *offer ;

const productOldPrice = product.price || '';

if (!product || !offerFetch) { 
  return { 
    title: 'محصول یافت نشد', 
    description: 'محصولی با این مشخصات وجود ندارد.', 
  }; 
} 
  return {

   
    title: product.name,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.mainImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    // متاهای سفارشی
    other: {
      'meta[name="product_id"]': product.id,
      'meta[name="product_name"]': product.name,
      'meta[property="og:image"]': product.mainImage,
      'meta[name="product_price"]': productPrice,
      'meta[name="product_old_price"]': productOldPrice,
      'meta[name="availability"]': product.supply ? 'instock' : 'outofstock',
    },
  }
}


export default function ProductPage({params}) {
  return (
<ProductDetail param={params.id}/>
)
}
