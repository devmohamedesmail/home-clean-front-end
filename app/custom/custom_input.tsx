'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CustomInput({ label,type="text", placeholder, value, onChange }: any) {
    const {t , i18n}= useTranslation();
    return (
        <div className='mb-4'>
            <label className={`block text-sm font-medium text-gray-700 ${i18n.language === 'ar' ? 'text-right' : ''}`}>{label}</label>
            <input
                type={type}
                className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:border-main w-full ${i18n.language === 'ar' ? 'text-right' : ''}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
