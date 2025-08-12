'use client'
import React, { useState } from 'react'

import { FaPhone } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

import { useTranslation } from 'react-i18next';
import Language_Switcher from '../common_components/language_switcher';
import Logo from './logo';
import Link from 'next/link';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100'>
            <div className='container mx-auto px-4 lg:px-6'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <div className='flex-shrink-0'>
                    <Logo />
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:block'>
                        <ul className='flex items-center space-x-8'>
                            <li>
                                <a href="#" className='text-gray-700 hover:text-main font-medium transition-colors duration-200 relative group'>
                                    {t('homepage.nav.home')}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-main transition-all duration-200 group-hover:w-full"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className='text-gray-700 hover:text-main font-medium transition-colors duration-200 relative group'>
                                    {t('homepage.nav.services')}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-main transition-all duration-200 group-hover:w-full"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className='text-gray-700 hover:text-main font-medium transition-colors duration-200 relative group'>
                                    {t('homepage.nav.contact')}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-main transition-all duration-200 group-hover:w-full"></span>
                                </a>
                            </li>
                        </ul>
                    </div>




                   
                    {/* Desktop CTA Button */}
                    <div className='hidden md:flex items-center'>
                         
                         <div className='mx-1'>
                            
                            <Language_Switcher />
                            </div>
                        <button className='bg-main hover:bg-main/90 text-white px-4 py-1 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5'>
                            <FaPhone className="w-4 h-4" />
                            <span className='font-bold'>
                                {t('homepage.nav.contact')}
                            </span>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMenu}
                            className='text-gray-700 hover:text-main p-2 rounded-lg transition-colors duration-200'
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <HiX className="w-6 h-6" />
                            ) : (
                                <HiMenu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className='md:hidden border-t border-gray-100'>
                        <div className='px-2 pt-2 pb-3 space-y-1 bg-white'>
                            <Link href="#" className='block px-3 py-3 text-gray-700 hover:text-main hover:bg-gray-50 rounded-lg font-medium transition-all duration-200'>
                                Home
                                {t('homepage.nav.home')}
                            </Link>
                            <Link href="#" className='block px-3 py-3 text-gray-700 hover:text-main hover:bg-gray-50 rounded-lg font-medium transition-all duration-200'>
                                
                                {t('homepage.nav.services')}
                            </Link>
                            <Link href="#" className='block px-3 py-3 text-gray-700 hover:text-main hover:bg-gray-50 rounded-lg font-medium transition-all duration-200'>
                                
                                {t('homepage.nav.contact')}
                            </Link>
                            <div className='pt-2'>
                                <button className='w-full bg-main hover:bg-main/90 text-white px-2 py-1 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-200'>
                                    <FaPhone className="w-4 h-4" />
                                    <span>{t('homepage.nav.contact')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
