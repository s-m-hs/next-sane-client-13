


import Sidebar from '@/components/madules/p-user/Sidebar'
import React from 'react'

export default function layout({ children }) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3'> <Sidebar />
        </div>
        <div className='col-9'> { children }
        </div>
      </div>
    </div>
  )
}
