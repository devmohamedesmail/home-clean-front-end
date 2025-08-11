'use client'
import React, { useState } from 'react'
import { FaBell, FaCalendarAlt, FaDollarSign, FaUser, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaEllipsisV, FaTrash, FaEye, FaTimes } from 'react-icons/fa'
import { MdMarkEmailRead, MdMarkEmailUnread } from 'react-icons/md'

interface Notification {
  id: string
  type: 'booking' | 'payment' | 'review' | 'system' | 'reminder'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  priority: 'low' | 'medium' | 'high'
  actionUrl?: string
  metadata?: {
    bookingId?: string
    amount?: number
    customerName?: string
  }
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'New Booking Request',
      message: 'Sarah Johnson has requested a cleaning service for August 15th at 9:00 AM. 2 workers needed.',
      timestamp: '2025-08-11T10:30:00Z',
      isRead: false,
      priority: 'high',
      actionUrl: '/cleaner/booking',
      metadata: {
        bookingId: 'BK-001',
        customerName: 'Sarah Johnson'
      }
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: 'You have received a payment of $120.00 from Michael Chen for completed cleaning service.',
      timestamp: '2025-08-11T09:15:00Z',
      isRead: false,
      priority: 'medium',
      metadata: {
        amount: 120,
        customerName: 'Michael Chen'
      }
    },
    {
      id: '3',
      type: 'review',
      title: 'New 5-Star Review',
      message: 'Emily Rodriguez left you a 5-star review: "Excellent service! Very professional and thorough cleaning."',
      timestamp: '2025-08-10T16:45:00Z',
      isRead: true,
      priority: 'medium',
      metadata: {
        customerName: 'Emily Rodriguez'
      }
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Upcoming Appointment',
      message: 'Reminder: You have a cleaning appointment with David Thompson tomorrow at 10:00 AM.',
      timestamp: '2025-08-10T14:20:00Z',
      isRead: true,
      priority: 'high',
      actionUrl: '/cleaner/booking',
      metadata: {
        bookingId: 'BK-004',
        customerName: 'David Thompson'
      }
    },
    {
      id: '5',
      type: 'system',
      title: 'Profile Update Required',
      message: 'Please update your business license information in your profile settings.',
      timestamp: '2025-08-09T11:30:00Z',
      isRead: true,
      priority: 'medium',
      actionUrl: '/cleaner/settings'
    },
    {
      id: '6',
      type: 'booking',
      title: 'Booking Cancelled',
      message: 'Lisa Anderson has cancelled her booking scheduled for August 19th. Cancellation reason: Schedule conflict.',
      timestamp: '2025-08-09T08:15:00Z',
      isRead: true,
      priority: 'low',
      metadata: {
        customerName: 'Lisa Anderson'
      }
    },
    {
      id: '7',
      type: 'payment',
      title: 'Weekly Earnings Summary',
      message: 'Your total earnings for this week: $450.00 from 5 completed bookings.',
      timestamp: '2025-08-08T17:00:00Z',
      isRead: true,
      priority: 'low',
      metadata: {
        amount: 450
      }
    }
  ])

  const [filter, setFilter] = useState('all')
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === 'high' ? 'text-red-500' : priority === 'medium' ? 'text-yellow-500' : 'text-blue-500'
    
    switch (type) {
      case 'booking':
        return <FaCalendarAlt className={`text-xl ${iconClass}`} />
      case 'payment':
        return <FaDollarSign className={`text-xl ${iconClass}`} />
      case 'review':
        return <FaUser className={`text-xl ${iconClass}`} />
      case 'system':
        return <FaInfoCircle className={`text-xl ${iconClass}`} />
      case 'reminder':
        return <FaExclamationTriangle className={`text-xl ${iconClass}`} />
      default:
        return <FaBell className={`text-xl ${iconClass}`} />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50'
      case 'medium': return 'border-l-yellow-500 bg-yellow-50'
      case 'low': return 'border-l-blue-500 bg-blue-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
  }

  const markAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: false } : notif
      )
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    )
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notif.isRead
    return notif.type === filter
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className='container mx-auto px-4 py-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2 flex items-center'>
            <FaBell className='mr-3 text-main' />
            Notifications
            {unreadCount > 0 && (
              <span className='ml-3 bg-red-500 text-white text-sm rounded-full px-2 py-1'>
                {unreadCount}
              </span>
            )}
          </h1>
          <p className='text-gray-600'>Stay updated with your cleaning service activities</p>
        </div>
        {unreadCount > 0 && (
          <button 
            className='btn bg-main hover:bg-blue-700 text-white border-none'
            onClick={markAllAsRead}
          >
            <MdMarkEmailRead className='mr-2' />
            Mark All Read
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>High Priority</p>
              <p className='text-2xl font-bold text-gray-900'>
                {notifications.filter(n => n.priority === 'high').length}
              </p>
            </div>
            <FaExclamationTriangle className='text-red-500 text-2xl' />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Unread</p>
              <p className='text-2xl font-bold text-gray-900'>{unreadCount}</p>
            </div>
            <MdMarkEmailUnread className='text-yellow-500 text-2xl' />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Bookings</p>
              <p className='text-2xl font-bold text-gray-900'>
                {notifications.filter(n => n.type === 'booking').length}
              </p>
            </div>
            <FaCalendarAlt className='text-green-500 text-2xl' />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Payments</p>
              <p className='text-2xl font-bold text-gray-900'>
                {notifications.filter(n => n.type === 'payment').length}
              </p>
            </div>
            <FaDollarSign className='text-blue-500 text-2xl' />
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
            All ({notifications.length})
          </button>
          <button 
            className={`btn btn-sm ${filter === 'unread' ? 'btn-warning' : 'btn-outline'}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button 
            className={`btn btn-sm ${filter === 'booking' ? 'btn-info' : 'btn-outline'}`}
            onClick={() => setFilter('booking')}
          >
            Bookings
          </button>
          <button 
            className={`btn btn-sm ${filter === 'payment' ? 'btn-success' : 'btn-outline'}`}
            onClick={() => setFilter('payment')}
          >
            Payments
          </button>
          <button 
            className={`btn btn-sm ${filter === 'review' ? 'btn-accent' : 'btn-outline'}`}
            onClick={() => setFilter('review')}
          >
            Reviews
          </button>
          <button 
            className={`btn btn-sm ${filter === 'reminder' ? 'btn-warning' : 'btn-outline'}`}
            onClick={() => setFilter('reminder')}
          >
            Reminders
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className='space-y-4'>
        {filteredNotifications.length === 0 ? (
          <div className='bg-white rounded-lg shadow-md p-12 text-center'>
            <FaBell className='text-6xl text-gray-300 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>No notifications found</h3>
            <p className='text-gray-500'>Check back later for updates on your cleaning services.</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border-l-4 ${getPriorityColor(notification.priority)} ${!notification.isRead ? 'ring-2 ring-blue-100' : ''}`}
            >
              <div className='p-6'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-start space-x-4 flex-1'>
                    <div className='flex-shrink-0'>
                      {getNotificationIcon(notification.type, notification.priority)}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center mb-2'>
                        <h3 className={`text-lg font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <span className='ml-2 w-2 h-2 bg-blue-500 rounded-full'></span>
                        )}
                      </div>
                      <p className='text-gray-600 mb-3'>{notification.message}</p>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-gray-500'>{formatTimestamp(notification.timestamp)}</span>
                        <div className='flex items-center space-x-2'>
                          {notification.metadata?.amount && (
                            <span className='badge badge-success text-white'>
                              ${notification.metadata.amount}
                            </span>
                          )}
                          <span className={`badge ${notification.priority === 'high' ? 'badge-error' : notification.priority === 'medium' ? 'badge-warning' : 'badge-info'}`}>
                            {notification.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2 ml-4'>
                    <button 
                      className='btn btn-sm btn-ghost'
                      onClick={() => setSelectedNotification(notification)}
                    >
                      <FaEye className='text-gray-500' />
                    </button>
                    <button 
                      className='btn btn-sm btn-ghost'
                      onClick={() => notification.isRead ? markAsUnread(notification.id) : markAsRead(notification.id)}
                    >
                      {notification.isRead ? (
                        <MdMarkEmailUnread className='text-gray-500' />
                      ) : (
                        <MdMarkEmailRead className='text-green-500' />
                      )}
                    </button>
                    <button 
                      className='btn btn-sm btn-ghost'
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <FaTrash className='text-red-500' />
                    </button>
                  </div>
                </div>
                {notification.actionUrl && (
                  <div className='mt-4 pt-4 border-t border-gray-200'>
                    <button className='btn btn-sm bg-main text-white border-none hover:bg-blue-700'>
                      View Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className='flex justify-between items-center mb-6'>
              <h3 className="font-bold text-xl flex items-center">
                {getNotificationIcon(selectedNotification.type, selectedNotification.priority)}
                <span className='ml-3'>{selectedNotification.title}</span>
              </h3>
              <button 
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setSelectedNotification(null)}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className='space-y-4'>
              <div>
                <h4 className='font-semibold text-gray-700 mb-2'>Message</h4>
                <p className='text-gray-600 leading-relaxed'>{selectedNotification.message}</p>
              </div>
              
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='font-semibold text-gray-700 mb-2'>Type</h4>
                  <span className='badge badge-outline capitalize'>{selectedNotification.type}</span>
                </div>
                <div>
                  <h4 className='font-semibold text-gray-700 mb-2'>Priority</h4>
                  <span className={`badge ${selectedNotification.priority === 'high' ? 'badge-error' : selectedNotification.priority === 'medium' ? 'badge-warning' : 'badge-info'}`}>
                    {selectedNotification.priority}
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className='font-semibold text-gray-700 mb-2'>Received</h4>
                <p className='text-gray-600'>{new Date(selectedNotification.timestamp).toLocaleString()}</p>
              </div>
              
              {selectedNotification.metadata && (
                <div>
                  <h4 className='font-semibold text-gray-700 mb-2'>Additional Information</h4>
                  <div className='bg-gray-50 rounded-lg p-4'>
                    {selectedNotification.metadata.customerName && (
                      <p><strong>Customer:</strong> {selectedNotification.metadata.customerName}</p>
                    )}
                    {selectedNotification.metadata.amount && (
                      <p><strong>Amount:</strong> ${selectedNotification.metadata.amount}</p>
                    )}
                    {selectedNotification.metadata.bookingId && (
                      <p><strong>Booking ID:</strong> {selectedNotification.metadata.bookingId}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-action">
              <button 
                className="btn btn-outline"
                onClick={() => setSelectedNotification(null)}
              >
                Close
              </button>
              {selectedNotification.actionUrl && (
                <button className="btn bg-main text-white border-none hover:bg-blue-700">
                  View Details
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
