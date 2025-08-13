'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'

export default function CustomInput({ label, type = "text", placeholder, value, onChange, icon, name }: any) {
    const { t, i18n } = useTranslation();
    const [showPassword, setShowPassword] = useState(false)
    return (

        <div>
            <label htmlFor={label} className={`block text-sm font-medium text-gray-700 mb-2 ${i18n.language === 'ar' ? 'text-right arabic-font' : ''}`}>
                {label}
            </label>
            <div className={`relative flex `}>
                <div className="absolute block inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               
                    {icon}
                </div>
                <input
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    id={label}
                    value={value}
                    onChange={onChange}
                    className={`block w-full px-10 pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-main ${i18n.language === 'ar' ? 'text-right arabic-font' : ''}`}
                    placeholder={placeholder}
                    name={name}
                />



                {type === 'password' && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <FaEyeSlash color='black' className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                        ) : (
                            <FaEye color='black' className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                        )}
                    </button>
                )}



            </div>
        </div>
    )
}
