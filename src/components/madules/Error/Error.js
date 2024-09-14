'use client' // Error boundaries must be Client Components
 
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

 
export default function Error({ error, reset }) {
   const  rout=useRouter()

   const navigatHandler=()=>{
    rout.push('/')

   }
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>مشکلی پیش آمده ...</h2>
      <button
      className='btn btn-warning'
        onClick={
            ()=>
          // Attempt to recover by trying to re-render the segment
          navigatHandler()
        }
      >
        تلاش مجدد
      </button>
    </div>
  )
}