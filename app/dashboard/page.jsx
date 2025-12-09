import React from 'react'
import AddNew from './_components/AddNew'

function page() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <p>Start your mock interview now.</p>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNew/>
      </div>
    </div>
  )
}

export default page