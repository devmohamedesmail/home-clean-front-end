'use client'
import React, { useState, useRef, useEffect } from 'react'
import {
    FaBell,
    FaUser,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaHome,
    FaCalendarAlt,
    FaClipboardList,
    FaChartBar
} from 'react-icons/fa'

import Logo from '../user_components/logo'
import Link from 'next/link'

export default function CleanerNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)
    const accountDropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
                setIsAccountDropdownOpen(false)
            }
        }

        if (isAccountDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }
    }, [isAccountDropdownOpen])

    const menuItems = [
        { icon: FaHome, label: 'Dashboard', href: '/cleaner/dashboard' },
        { icon: FaCalendarAlt, label: 'Schedule', href: '/cleaner/booking' },
        { icon: FaClipboardList, label: 'Offers', href: '/cleaner/offers' },
        { icon: FaChartBar, label: 'Orders', href: '/cleaner/orders' },
    ]

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const toggleAccountDropdown = () => {
        setIsAccountDropdownOpen(!isAccountDropdownOpen)
    }

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Logo />

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[--color-main] hover:bg-gray-50 transition-colors duration-200"
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-4">

                        {/* Notifications */}
                        <div className="relative">
                            <Link href="/cleaner/notifications" className="p-2 block rounded-full text-gray-600 hover:text-[--color-main] hover:bg-gray-50 transition-colors duration-200">
                                <FaBell className="w-5 h-5" />
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                                    3
                                </span>
                            </Link>
                        </div>

                        {/* Settings */}
                        <Link href="/cleaner/settings" className="hidden sm:block p-2 rounded-full text-gray-600 hover:text-[--color-main] hover:bg-gray-50 transition-colors duration-200">
                            <FaCog className="w-5 h-5" />
                        </Link>

                        {/* Account Dropdown */}
                        <div className="relative" ref={accountDropdownRef}>
                            <button
                                onClick={toggleAccountDropdown}
                                className="flex items-center space-x-2 p-1 rounded-full text-gray-600 hover:text-[--color-main] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-main] transition-colors duration-200"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-[--color-main] to-blue-500 rounded-full flex items-center justify-center">
                                    <FaUser className="w-4 h-4 text-white" />
                                </div>
                                <span className="hidden sm:block text-sm font-medium">John Doe</span>
                            </button>

                            {/* Account Dropdown Menu */}
                            {isAccountDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-200 z-50">
                                    {/* User Info Header */}
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-[--color-main] to-blue-500 rounded-full flex items-center justify-center">
                                                <FaUser className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">John Doe</p>
                                                <p className="text-xs text-gray-500">Cleaner</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-1">
                                        <a
                                            href="/cleaner/profile"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[--color-main] transition-colors duration-200"
                                            onClick={() => setIsAccountDropdownOpen(false)}
                                        >
                                            <FaUser className="w-4 h-4" />
                                            <span>My Profile</span>
                                        </a>
                                        <a
                                            href="/cleaner/settings"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[--color-main] transition-colors duration-200"
                                            onClick={() => setIsAccountDropdownOpen(false)}
                                        >
                                            <FaCog className="w-4 h-4" />
                                            <span>Settings</span>
                                        </a>
                                    </div>

                                    {/* Logout Section */}
                                    <div className="border-t border-gray-100 pt-1">
                                        <button
                                            onClick={() => {
                                                setIsAccountDropdownOpen(false)
                                                // Handle logout logic here
                                                console.log('Logout clicked')
                                            }}
                                            className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                                        >
                                            <FaSignOutAlt className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 rounded-md text-gray-600 hover:text-[--color-main] hover:bg-gray-50 transition-colors duration-200"
                        >
                            {isMobileMenuOpen ? (
                                <FaTimes className="w-5 h-5" />
                            ) : (
                                <FaBars className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden relative z-50 bg-white shadow-lg">
                        {/* Mobile Menu Header with Close Button */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="px-2 pt-2 pb-4 space-y-1">
                            {menuItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[--color-main] hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                                        <item.icon className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <span>{item.label}</span>
                                </a>
                            ))}

                            {/* Mobile Settings Link */}
                            <a
                                href="/cleaner/settings"
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[--color-main] hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100 sm:hidden"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                                    <FaCog className="w-4 h-4 text-gray-600" />
                                </div>
                                <span>Settings</span>
                            </a>

                            {/* Mobile Profile & Logout Section */}
                            <div className="pt-3 mt-3 border-t border-gray-200">
                                <div className="px-4 py-2">
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Account</p>
                                </div>

                                <a
                                    href="/cleaner/profile"
                                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[--color-main] hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                                        <FaUser className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <span>Profile</span>
                                </a>

                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false)
                                        // Handle logout logic here
                                        console.log('Logout clicked')
                                    }}
                                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-100"
                                >
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                                        <FaSignOutAlt className="w-4 h-4 text-red-600" />
                                    </div>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </nav>
    )
}