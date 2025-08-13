import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CleanerHomeItem({ label, count, icon }: any) {
    const {t , i18n}=useTranslation();
    return (
        <div className='bg-white p-4 rounded shadow py-5 rounded-lg hover:bg-gray-100 hover:cursor-pointer hover:shadow-lg'>
            <label  className={`text-main font-bold ${i18n.language === 'ar' ? 'text-right arabic-font' : ''} `}>{label}</label>
            <div className='mt-5'>
                <p className='font-bold text-2xl'>{count}</p>
            </div>
        </div>
    )
}
