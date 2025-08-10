import React from 'react'

export default function Logo() {
  return (
    <div className='flex items-center gap-2'>
        <img src="/images/logo.jpg" alt="" className='w-12 h-12' />
        <h4>
            <span className='text-black font-bold'>CLEAN</span>
            <span className='text-main font-bold'>HOME</span></h4>
    </div>
  )
}
