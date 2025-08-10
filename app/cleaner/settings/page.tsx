'use client'
import CustomInput from '@/app/custom/custom_input'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CiFileOn } from "react-icons/ci";

export default function SettingsPage() {
  const { t , i18n } = useTranslation();
  return (
    <div className='container mx-auto px-4 py-8'>


      <div className='w-full md:w-1/2 m-auto'>

        <div className='mb-5'>
          <h1 className={`text-2xl font-extrabold mb-2 ${i18n.language === 'ar' ? 'text-right' : ''} `}>{t('cleaner.settings.title')}</h1>
          <p className={`text-gray-600 ${i18n.language === 'ar' ? 'text-right' : ''}`}>{t('cleaner.settings.description')}</p>
        </div>



        <div className=''>
          <CustomInput 
           label={t('cleaner.settings.company_name')} 
           placeholder={t('cleaner.settings.company_name')} 
           value="" />
          <CustomInput label={t('cleaner.settings.company_address')} placeholder={t('cleaner.settings.company_address')} value="" onChange={() => { }} />
          <CustomInput label={t('cleaner.settings.company_description')} placeholder={t('cleaner.settings.company_description')} value="" onChange={() => { }} />
          <CustomInput label={t('cleaner.settings.company_phone')} placeholder={t('cleaner.settings.company_phone')} value="" onChange={() => { }} />
          <CustomInput label={t('cleaner.settings.vat_number')} placeholder={t('cleaner.settings.vat_number')} value="" onChange={() => { }} />
          <CustomInput label={t('cleaner.settings.business_license')} placeholder={t('cleaner.settings.business_license')} value="" onChange={() => { }} />
          <div className='border p-4 border-dashed my-3 flex flex-col  items-center'>
            <label htmlFor="business_license_file">
              <span>{t('cleaner.settings.business_license')}</span>
              <CiFileOn size={40} />
            </label>

            <input type="file" id="business_license_file" className='hidden' />
          </div>
          <CustomInput label={t('cleaner.settings.cleaners_no')} placeholder={t('cleaner.settings.cleaners_no')} value="" onChange={() => { }} />


          <div>
            <button className='bg-main py-2 w-full rounded hover:bg-main/80 hover:cursor-pointer font-bold'>{t('common.save')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
