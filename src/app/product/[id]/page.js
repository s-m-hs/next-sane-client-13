// import React from 'react'
// import ProductDetail from '@/components/templatess/ProductDetail/ProductDetail'
// import apiUrl from '@/utils/ApiUrl/apiUrl'
// import Head from 'next/head'

// export async function generateMetadata({ params, searchParams }, parent) {
//   // read route params
//   const id = (await params).id
 
//   // fetch data
//   const product = await fetch(`${apiUrl}/api/CyProducts/${id}`).then((res) => res.json())
//   const offerFetch = await fetch(`${apiUrl}/api/CyKeyDatas/13`).then((res) => res.json())
//   const offer=Number(offerFetch.value) 

//   const productPrice =
//   product.noOffPrice !== product.price
//     ? product.noOffPrice
//     : product.price *offer ;

// const productOldPrice = product.price || '';

// if (!product || !offerFetch) { 
//   return { 
//     title: 'محصول یافت نشد', 
//     description: 'محصولی با این مشخصات وجود ندارد.', 
//   }; 
// } 
//   return {

//     product_id:product.id,
//     openGraph: {
//       title: product.name,
//       description: product.description,
//       images: [
//         {
//           url: product.mainImage,
//           width: 1200,
//           height: 630,
//           alt: product.name,
//         },
//       ],
//     },
//     // متاهای سفارشی
//     // other: {
//     //   'meta[name="product_id"]': product.id,
//     //   'meta[name="product_name"]': product.name,
//     //   'meta[property="og:image"]': product.mainImage,
//     //   'meta[name="product_price"]': productPrice,
//     //   'meta[name="product_old_price"]': productOldPrice,
//     //   'meta[name="availability"]': product.supply ? 'instock' : 'outofstock',
//     // },
//     other:{
//       product,productPrice,productOldPrice
//     }
//   }
// }

import React from 'react';
import apiUrl from '@/utils/ApiUrl/apiUrl';
import ProductDetail from '@/components/templatess/ProductDetail/ProductDetail';
export async function generateMetadata({ params }) {
  const { id } = params;

  const product = await fetch(`${apiUrl}/api/CyProducts/${id}`).then((res) =>
    res.json()
  );
  const offerFetch = await fetch(`${apiUrl}/api/CyKeyDatas/13`).then((res) =>
    res.json()
  );
  const offer = Number(offerFetch.value);

  if (!product || !offerFetch) {
    return {
      title: 'محصول یافت نشد',
      description: 'محصولی با این مشخصات وجود ندارد.',
    };
  }
  const availability=product.supply ? 'instock' : 'outofstock'
  const product_name=product.name
const product_id= product.id
  const product_price =
    product.noOffPrice !== product.price
      ? product.noOffPrice/10
      : (product.price/10) * offer;

  const product_old_price = product.price/10 || '';

  return {
    title: product.name,
    description: product.description,
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
    other: {
      product_id,
      product_name,
      product_price,
      product_old_price,
      availability
    },
  };
}
export default async function ProductPage({ params }) {
  return (
<ProductDetail param={params.id}/>
)
}
