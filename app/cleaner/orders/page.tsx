'use client'
import React from 'react';
import { 
  FaHome, 
  FaUtensils, 
  FaCar, 
  FaUsers, 
  FaDollarSign,
  FaEye,
  FaEdit,
  FaTrash,
  FaClipboardList
} from 'react-icons/fa';

export default function OrdersPage() {
  const data = [
    {
      orderNo: 1,
      name: "Cy Ganderton",
      address: "123 Main St, Downtown Area",
      noRooms: 3,
      kitchen: "Yes",
      garage: "No",
      noOfCleaners: 2,
      totalPrice: 100,
      status: "Completed"
    },
    {
      orderNo: 2,
      name: "Hart Hagerty",
      address: "456 Oak Avenue, Uptown",
      noRooms: 4,
      kitchen: "No",
      garage: "Yes",
      noOfCleaners: 3,
      totalPrice: 150,
      status: "In Progress"
    },
    {
      orderNo: 3,
      name: "Brice Swyre",
      address: "789 Pine Road, Suburbs",
      noRooms: 2,
      kitchen: "Yes",
      garage: "No",
      noOfCleaners: 1,
      totalPrice: 200,
      status: "Pending"
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Completed': 'badge-success',
      'In Progress': 'badge-info', 
      'Pending': 'badge-warning',
      'Cancelled': 'badge-error'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'badge-ghost';
  };


  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container px-6 mx-auto py-8'>
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-lg">
              <FaClipboardList className="w-6 h-6 text-primary-content" />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-base-content'>Orders Management</h1>
              <p className="text-base-content/70 mt-1">Track and manage all cleaning service orders</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="stats shadow bg-base-100">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <FaClipboardList className="w-8 h-8" />
                </div>
                <div className="stat-title">Total Orders</div>
                <div className="stat-value text-primary">{data.length}</div>
              </div>
            </div>
            
            <div className="stats shadow bg-base-100">
              <div className="stat">
                <div className="stat-figure text-success">
                  <FaDollarSign className="w-8 h-8" />
                </div>
                <div className="stat-title">Revenue</div>
                <div className="stat-value text-success">${data.reduce((sum, order) => sum + order.totalPrice, 0)}</div>
              </div>
            </div>
            
            <div className="stats shadow bg-base-100">
              <div className="stat">
                <div className="stat-figure text-info">
                  <FaUsers className="w-8 h-8" />
                </div>
                <div className="stat-title">Active Cleaners</div>
                <div className="stat-value text-info">{data.reduce((sum, order) => sum + order.noOfCleaners, 0)}</div>
              </div>
            </div>
            
            <div className="stats shadow bg-base-100">
              <div className="stat">
                <div className="stat-figure text-warning">
                  <FaHome className="w-8 h-8" />
                </div>
                <div className="stat-title">Total Rooms</div>
                <div className="stat-value text-warning">{data.reduce((sum, order) => sum + order.noRooms, 0)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center mb-6">
              <h2 className="card-title text-2xl">
                <FaClipboardList className="w-6 h-6" />
                Orders List
              </h2>
              <button className="btn btn-primary">
                Add New Order
              </button>
            </div>

            {/* Desktop Table */}
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span>#</span>
                      </div>
                    </th>
                    <th>
                      <div className="flex items-center gap-2">
                        <FaUsers className="w-4 h-4" />
                        <span>Customer</span>
                      </div>
                    </th>
                    <th className="hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <FaHome className="w-4 h-4" />
                        <span>Address</span>
                      </div>
                    </th>
                    <th className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <FaHome className="w-4 h-4" />
                        <span>Rooms</span>
                      </div>
                    </th>
                    <th className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <FaUtensils className="w-4 h-4" />
                        <span>Kitchen</span>
                      </div>
                    </th>
                    <th className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <FaCar className="w-4 h-4" />
                        <span>Garage</span>
                      </div>
                    </th>
                    <th className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <FaUsers className="w-4 h-4" />
                        <span>Cleaners</span>
                      </div>
                    </th>
                    <th className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <FaDollarSign className="w-4 h-4" />
                        <span>Price</span>
                      </div>
                    </th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((order) => (
                    <tr key={order.orderNo} className="hover:bg-base-200/50 transition-colors">
                      <td className="text-center font-bold">
                        <div className="badge badge-outline">#{order.orderNo}</div>
                      </td>
                      <td>
                        <div className="font-semibold text-base-content">{order.name}</div>
                      </td>
                      <td className="hidden lg:table-cell">
                        <div className="text-sm text-base-content/70 max-w-xs truncate" title={order.address}>
                          {order.address}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="badge badge-ghost">{order.noRooms}</div>
                      </td>
                      <td className="text-center">
                        {order.kitchen === "Yes" ? (
                          <div className="badge badge-success">✓</div>
                        ) : (
                          <div className="badge badge-error">✗</div>
                        )}
                      </td>
                      <td className="text-center">
                        {order.garage === "Yes" ? (
                          <div className="badge badge-success">✓</div>
                        ) : (
                          <div className="badge badge-error">✗</div>
                        )}
                      </td>
                      <td className="text-center">
                        <div className="badge badge-info">{order.noOfCleaners}</div>
                      </td>
                      <td className="text-center">
                        <div className="font-bold text-success">${order.totalPrice}</div>
                      </td>
                      <td className="text-center">
                        <div className={`badge ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="btn btn-sm btn-ghost btn-square tooltip" data-tip="View">
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button className="btn btn-sm btn-ghost btn-square tooltip" data-tip="Edit">
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button className="btn btn-sm btn-ghost btn-square tooltip text-error hover:bg-error hover:text-error-content" data-tip="Delete">
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="lg:hidden mt-6 space-y-4">
              {data.map((order) => (
                <div key={order.orderNo} className="card bg-base-200 shadow-md">
                  <div className="card-body p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">#{order.orderNo}</h3>
                        <p className="text-base-content/70">{order.name}</p>
                      </div>
                      <div className={`badge ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </div>
                    </div>
                    
                    <div className="text-sm text-base-content/70 mb-3">
                      <FaHome className="inline w-3 h-3 mr-1" />
                      {order.address}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <FaHome className="w-4 h-4 text-primary" />
                        <span>{order.noRooms} Rooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUsers className="w-4 h-4 text-info" />
                        <span>{order.noOfCleaners} Cleaners</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUtensils className="w-4 h-4 text-warning" />
                        <span>Kitchen: {order.kitchen}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCar className="w-4 h-4 text-secondary" />
                        <span>Garage: {order.garage}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-bold text-success">
                        ${order.totalPrice}
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-primary">
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button className="btn btn-sm btn-secondary">
                          <FaEdit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
