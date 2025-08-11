'use client'
'use client'
import React, { useState } from 'react'
import { FaPlus, FaCalendarAlt, FaClock, FaUsers, FaDollarSign, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md'

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'badge-warning'
      case 'confirmed': return 'badge-info'
      case 'completed': return 'badge-success'
      case 'cancelled': return 'badge-error'
      default: return 'badge-neutral'
    }
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
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Booking Management</h1>
          <p className='text-gray-600'>Manage your cleaning service bookings</p>
        </div>
        <button 
          className='btn bg-main hover:bg-blue-700 text-white border-none'
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className='mr-2' />
          New Booking
        </button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8'>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Total Bookings</p>
              <p className='text-2xl font-bold text-gray-900'>{stats.total}</p>
            </div>
            <FaCalendarAlt className='text-blue-500 text-2xl' />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Pending</p>
              <p className='text-2xl font-bold text-gray-900'>{stats.pending}</p>
            </div>
            <FaClock className='text-yellow-500 text-2xl' />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Confirmed</p>
              <p className='text-2xl font-bold text-gray-900'>{stats.confirmed}</p>
            </div>
            <FaUsers className='text-blue-400 text-2xl' />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Completed</p>
              <p className='text-2xl font-bold text-gray-900'>{stats.completed}</p>
            </div>
            <FaCalendarAlt className='text-green-500 text-2xl' />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Revenue</p>
              <p className='text-2xl font-bold text-gray-900'>${stats.totalRevenue}</p>
            </div>
            <FaDollarSign className='text-green-600 text-2xl' />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-lg shadow-md p-4 mb-6'>
        <div className='flex flex-wrap gap-2'>
          <button 
            className={`btn btn-sm ${filter === 'all' ? 'bg-main text-white' : 'btn-outline'}`}
            onClick={() => setFilter('all')}
          >
            All Bookings
          </button>
          <button 
            className={`btn btn-sm ${filter === 'pending' ? 'btn-warning' : 'btn-outline'}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`btn btn-sm ${filter === 'confirmed' ? 'btn-info' : 'btn-outline'}`}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </button>
          <button 
            className={`btn btn-sm ${filter === 'completed' ? 'btn-success' : 'btn-outline'}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
        {filteredBookings.map(booking => (
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
                  <span className='font-medium'>{booking.workers} Workers</span>
                </div>
                <div className='flex items-center text-sm'>
                  <FaDollarSign className='mr-2 text-green-600' />
                  <span className='font-bold text-green-600'>${booking.price}</span>
                </div>
              </div>

              {/* Services */}
              <div className='mb-4'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Services:</p>
                <div className='flex flex-wrap gap-1'>
                  {booking.services.map((service, index) => (
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
                    Confirm
                  </button>
                )}
                {booking.status === 'confirmed' && (
                  <button className='btn btn-sm btn-success text-white flex-1'>
                    Mark Complete
                  </button>
                )}
                {booking.status === 'completed' && (
                  <button className='btn btn-sm btn-outline flex-1'>
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className='flex justify-between items-center mb-6'>
              <h3 className="font-bold text-xl">Create New Booking</h3>
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
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Customer Name</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={newBooking.customerName}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Enter customer name"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={newBooking.customerPhone}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={newBooking.customerEmail}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Service Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={newBooking.address}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="Enter service address"
                  required
                />
              </div>

              {/* Booking Details */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Date</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newBooking.date}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Time</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={newBooking.time}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

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
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Price ($)</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newBooking.price}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
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
                  Cancel
                </button>
                <button type="submit" className="btn bg-main text-white border-none hover:bg-blue-700">
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
