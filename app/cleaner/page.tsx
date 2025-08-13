'use client'
import React from 'react'
import CleanerHomeItem from '../items/cleaner_home_item'
import { useTranslation } from 'react-i18next'


export default function CleanerHome() {
    const {t , i18n}=useTranslation();
    return (
        <div className='container m-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10'>
            <CleanerHomeItem label={t('cleaner.dashboard.total_bookings')} count={30} />
            <CleanerHomeItem label={t('cleaner.dashboard.total_revenue')} count={3000}  />
            <CleanerHomeItem label={t('cleaner.dashboard.pending_payments')} count={2000}  />
            <CleanerHomeItem label={t('cleaner.dashboard.completed_jobs')} count={3000}  />
            <CleanerHomeItem label={t('cleaner.dashboard.customer_feedback')} count={'50%'} />
            <CleanerHomeItem label={t('cleaner.dashboard.new_booking')} count={500}  />
            <CleanerHomeItem label={t('cleaner.dashboard.new_booking')} count={300}  />
        </div>
    )
}
