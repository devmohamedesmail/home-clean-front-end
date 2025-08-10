import React from 'react'

export default function CleanerHomeItem({ label, count, icon }: any) {
    return (
        <div className='bg-white p-4 rounded shadow py-5 rounded-lg hover:bg-gray-100 hover:cursor-pointer hover:shadow-lg'>
            <label htmlFor="" className='text-main font-bold'>{label}</label>
            <div className='mt-5'>
                <p className='font-bold text-2xl'>{count}</p>
            </div>
        </div>
    )
}
