import React from 'react'
import { FaPlus, FaCalendarAlt, FaClock, FaUsers, FaDollarSign, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md'

export default function CleanerBookingItem({ booking , t }: any) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'badge-warning'
            case 'confirmed': return 'badge-info'
            case 'completed': return 'badge-success'
            case 'cancelled': return 'badge-error'
            default: return 'badge-neutral'
        }
    }
    return (
        <div key={booking.id} className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
            <div className='p-6'>
                {/* Header */}
                <div className='flex justify-between items-start mb-4'>
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900'>{booking.customerName}</h3>
                        <span className={`badge ${getStatusColor(booking.status)} badge-sm`}>
                            {booking.status}
                        </span>
                    </div>
                    <div className='flex gap-2'>
                        <button className='btn btn-sm btn-ghost text-blue-600'>
                            <FaEye />
                        </button>
                        <button className='btn btn-sm btn-ghost text-green-600'>
                            <FaEdit />
                        </button>
                        <button className='btn btn-sm btn-ghost text-red-600'>
                            <FaTrash />
                        </button>
                    </div>
                </div>

                {/* Contact Info */}
                <div className='space-y-2 mb-4'>
                    <div className='flex items-center text-sm text-gray-600'>
                        <MdPhone className='mr-2 text-gray-400' />
                        {booking.customerPhone}
                    </div>
                    <div className='flex items-center text-sm text-gray-600'>
                        <MdEmail className='mr-2 text-gray-400' />
                        {booking.customerEmail}
                    </div>
                    <div className='flex items-start text-sm text-gray-600'>
                        <MdLocationOn className='mr-2 text-gray-400 mt-0.5' />
                        {booking.address}
                    </div>
                </div>

                {/* Booking Details */}
                <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div className='flex items-center text-sm'>
                        <FaCalendarAlt className='mr-2 text-blue-500' />
                        <span className='font-medium'>{booking.date}</span>
                    </div>
                    <div className='flex items-center text-sm'>
                        <FaClock className='mr-2 text-green-500' />
                        <span className='font-medium'>{booking.time}</span>
                    </div>
                    <div className='flex items-center text-sm'>
                        <FaUsers className='mr-2 text-purple-500' />
                        <span className='font-medium'>{booking.workers} {t('cleaner.booking.workers')}</span>
                    </div>
                    <div className='flex items-center text-sm'>
                        <FaDollarSign className='mr-2 text-green-600' />
                        <span className='font-bold text-green-600'>${booking.price}</span>
                    </div>
                </div>

                {/* Services */}
                <div className='mb-4'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>
                        {t('cleaner.booking.services')}
                    </p>
                    <div className='flex flex-wrap gap-1'>
                        {booking.services.map((service: any, index: any) => (
                            <span key={index} className='badge badge-outline badge-sm'>
                                {service}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className='flex gap-2'>
                    {booking.status === 'pending' && (
                        <button className='btn btn-sm bg-main text-white border-none hover:bg-blue-700 flex-1'>
                            
                            {t('cleaner.booking.confirm')}
                        </button>
                    )}
                    {booking.status === 'confirmed' && (
                        <button className='btn btn-sm btn-success text-white flex-1'>
                            {t('cleaner.booking.mark_complete')}
                        </button>
                    )}
                    {booking.status === 'completed' && (
                        <button className='btn btn-sm btn-outline flex-1'>
                            {t('cleaner.booking.view_details')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
