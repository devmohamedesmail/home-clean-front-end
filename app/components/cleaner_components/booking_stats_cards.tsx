import React from 'react'
import { FaPlus, FaCalendarAlt, FaClock, FaUsers, FaDollarSign, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md'

export default function BookingStatsCards({ stats , t }: { stats: any , t: any }) {
  return (
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8'>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                {t('cleaner.booking.total_bookings')}
              </p>
              <p className='text-2xl font-bold text-gray-900'>{stats.total}</p>
            </div>
            <FaCalendarAlt className='text-blue-500 text-2xl' />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>{t('cleaner.booking.pending')}</p>
              <p className='text-2xl font-bold text-gray-900'>{stats.pending}</p>
            </div>
            <FaClock className='text-yellow-500 text-2xl' />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>{t('cleaner.booking.confirmed')}</p>
              <p className='text-2xl font-bold text-gray-900'>{stats.confirmed}</p>
            </div>
            <FaUsers className='text-blue-400 text-2xl' />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>{t('cleaner.booking.completed')}</p>
              <p className='text-2xl font-bold text-gray-900'>{stats.completed}</p>
            </div>
            <FaCalendarAlt className='text-green-500 text-2xl' />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>{t('cleaner.booking.revenue')}</p>
              <p className='text-2xl font-bold text-gray-900'>${stats.totalRevenue}</p>
            </div>
            <FaDollarSign className='text-green-600 text-2xl' />
          </div>
        </div>
      </div>
  )
}
