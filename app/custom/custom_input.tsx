'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CustomInput({ label, type = "text", placeholder, value, onChange, icon, name}: any) {
    const { t, i18n } = useTranslation();
    return (
       
        <div>
            <label htmlFor={label} className={`block text-sm font-medium text-gray-700 mb-2 ${i18n.language === 'ar' ? 'text-right arabic-font' : ''}`}>
                {label}
            </label>
            <div className={`relative flex `}>
                <div className="absolute block inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* <MdEmail className="h-5 w-5 text-gray-400" /> */}
                    {icon}
                </div>
                <input
                    type={type}
                    id={label}
                    value={value}
                    onChange={onChange}
                    className={`block w-full pl-10 pr-3 py-3 border border-black rounded-lg  focus:border-main ${i18n.language === 'ar' ? 'text-right' : ''}`}
                    placeholder={placeholder}
                    name={name}
                />
            </div>
        </div>
    )
}
