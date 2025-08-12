'use client'
import BookingStatsCards from '@/app/components/cleaner_components/booking_stats_cards'
import CustomInput from '@/app/custom/custom_input'
import CleanerBookingItem from '@/app/items/cleaner_booking_item'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaPlus } from 'react-icons/fa'
import { FiUser } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";

interface Booking {
  id: string
  customerName: string
  customerPhone: string
  customerEmail: string
  address: string
  date: string
  time: string
  workers: number
  price: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  services: string[]
}

export default function BookingPage() {
  const { t } = useTranslation()
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      customerName: 'Sarah Johnson',
      customerPhone: '+1 (555) 123-4567',
      customerEmail: 'sarah.johnson@email.com',
      address: '123 Oak Street, Downtown, NY 10001',
      date: '2025-08-15',
      time: '09:00',
      workers: 2,
      price: 120,
      status: 'confirmed',
      services: ['Regular Cleaning', 'Kitchen Deep Clean']
    },
    {
      id: '2',
      customerName: 'Michael Chen',
      customerPhone: '+1 (555) 987-6543',
      customerEmail: 'michael.chen@email.com',
      address: '456 Pine Avenue, Midtown, NY 10002',
      date: '2025-08-16',
      time: '14:00',
      workers: 3,
      price: 180,
      status: 'pending',
      services: ['Deep Cleaning', 'Bathroom Sanitization', 'Window Cleaning']
    },
    {
      id: '3',
      customerName: 'Emily Rodriguez',
      customerPhone: '+1 (555) 456-7890',
      customerEmail: 'emily.rodriguez@email.com',
      address: '789 Maple Drive, Uptown, NY 10003',
      date: '2025-08-17',
      time: '11:30',
      workers: 1,
      price: 80,
      status: 'completed',
      services: ['Regular Cleaning']
    },
    {
      id: '4',
      customerName: 'David Thompson',
      customerPhone: '+1 (555) 321-0987',
      customerEmail: 'david.thompson@email.com',
      address: '321 Elm Street, Brooklyn, NY 11201',
      date: '2025-08-18',
      time: '10:00',
      workers: 2,
      price: 150,
      status: 'confirmed',
      services: ['Deep Cleaning', 'Carpet Cleaning']
    },
    {
      id: '5',
      customerName: 'Lisa Anderson',
      customerPhone: '+1 (555) 654-3210',
      customerEmail: 'lisa.anderson@email.com',
      address: '654 Cedar Lane, Queens, NY 11101',
      date: '2025-08-19',
      time: '15:30',
      workers: 1,
      price: 90,
      status: 'pending',
      services: ['Regular Cleaning', 'Refrigerator Cleaning']
    }
  ])

  const [newBooking, setNewBooking] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    address: '',
    date: '',
    time: '',
    workers: 1,
    price: 0,
    services: ''
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState('all')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewBooking(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const booking: Booking = {
      id: Date.now().toString(),
      customerName: newBooking.customerName,
      customerPhone: newBooking.customerPhone,
      customerEmail: newBooking.customerEmail,
      address: newBooking.address,
      date: newBooking.date,
      time: newBooking.time,
      workers: Number(newBooking.workers),
      price: Number(newBooking.price),
      status: 'pending',
      services: newBooking.services.split(',').map(s => s.trim())
    }

    setBookings(prev => [booking, ...prev])
    setNewBooking({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      address: '',
      date: '',
      time: '',
      workers: 1,
      price: 0,
      services: ''
    })
    setIsModalOpen(false)
  }

 

  const filteredBookings = bookings.filter(booking =>
    filter === 'all' || booking.status === filter
  )

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    totalRevenue: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0)
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            {t('cleaner.booking.title')}
          </h1>
          <p className='text-gray-600'>
            {t('cleaner.booking.description')}
          </p>
        </div>
        <button
          className='btn bg-main hover:bg-second text-white border-none rounded '
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className='mr-2' />

          {t('cleaner.booking.create_new_booking')}
        </button>
      </div>

      {/* Stats Cards */}
      <BookingStatsCards stats={stats} t={t} />

      {/* Filters */}
      <div className='bg-white rounded-lg shadow-md p-4 mb-6'>
        <div className='flex flex-wrap gap-2'>
          <button
            className={`btn btn-sm ${filter === 'all' ? 'bg-main text-white' : 'btn-outline'}`}
            onClick={() => setFilter('all')}
          >
            
            {t('cleaner.booking.all_bookings')}
          </button>
          <button
            className={`btn btn-sm ${filter === 'pending' ? 'btn-warning' : 'btn-outline'}`}
            onClick={() => setFilter('pending')}
          >
            {t('cleaner.booking.pending')}
          </button>
          <button
            className={`btn btn-sm ${filter === 'confirmed' ? 'btn-info' : 'btn-outline'}`}
            onClick={() => setFilter('confirmed')}
          >
            {t('cleaner.booking.confirmed')}
          </button>
          <button
            className={`btn btn-sm ${filter === 'completed' ? 'btn-success' : 'btn-outline'}`}
            onClick={() => setFilter('completed')}
          >
            {t('cleaner.booking.completed')}
          </button>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
        {filteredBookings.map(booking => (
          <CleanerBookingItem key={booking.id} booking={booking} t={t} />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className='flex justify-between items-center mb-6'>
              <h3 className="font-bold text-xl">
                {t('cleaner.booking.create_new_booking')}
              </h3>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Information */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                
                <CustomInput 
                  name="name"
                  icon={<FiUser />}
                  label={t('common.name')}
                  value={newBooking.customerName}
                  onChange={handleInputChange}
                  placeholder={t('common.name')}
                  
                />
                <CustomInput
                  name="phone"
                  icon={<FaPhoneAlt />}
                  label={t('common.phone')}
                  value={newBooking.customerPhone}
                  onChange={handleInputChange}
                  placeholder={t('common.phone')}
                />
              </div>

            

              

              <CustomInput
                  name="address"
                  icon={<CiLocationOn />}
                  label={t('common.address')}
                  value={newBooking.address}
                  onChange={handleInputChange}
                  placeholder={t('common.address')}
                />


                <CustomInput
                  name="date"
                  type="date"
                  icon={<CiCalendarDate />}
                  label={t('common.date')}
                  value={newBooking.date}
                  onChange={handleInputChange}
                  placeholder={t('common.address')}
                />

              {/* Booking Details */}
              

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Number of Workers</span>
                  </label>
                  <select
                    name="workers"
                    value={newBooking.workers}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value={1}>1 Worker</option>
                    <option value={2}>2 Workers</option>
                    <option value={3}>3 Workers</option>
                    <option value={4}>4 Workers</option>
                    <option value={5}>5+ Workers</option>
                  </select>
                </div>
                
                <CustomInput
                  name="time"
                  type="time"
                  icon={<CiCalendarDate />}
                  label={t('common.time')}
                  value={newBooking.time}
                  onChange={handleInputChange}
                  placeholder={t('common.address')}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Services (comma separated)</span>
                </label>
                <input
                  type="text"
                  name="services"
                  value={newBooking.services}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="e.g., Regular Cleaning, Kitchen Deep Clean, Bathroom Sanitization"
                  required
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  {t('common.cancel')}
                </button>
                <button type="submit" className="btn bg-main text-white border-none hover:bg-blue-700">
                  {t('common.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
