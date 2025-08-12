import React from 'react'
import { FaUsers } from "react-icons/fa";

export default function Cleaner_Offer_Item({ offer , t}: any) {
    return (
        <div key={offer.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      
                        <FaUsers size={25} color='black' className="mr-3" />
                        {offer.cleaners} {t('cleaner.offers.cleaners')}
                    </span>
                    <span className="text-main font-bold text-lg">${offer.rate}/hr</span>
                </div>
            </div>

            {/* Service Options */}
            <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">
                    {t('cleaner.offers.service_options')}
                </h4>
                <div className="flex flex-wrap gap-1">
                    {offer.options.map((option:any, index:any) => (
                        <span
                            key={index}
                            className="bg-main/10 text-main px-2 py-1 rounded-full text-xs font-medium"
                        >
                            {option}
                        </span>
                    ))}
                </div>
            </div>

            {/* Available Days */}
            <div>
                <h4 className="font-medium text-gray-700 mb-2">{t('cleaner.offers.available_days')}</h4>
                <div className="flex flex-wrap gap-1">
                    {offer.availableDays.map((day:any, index:any) => (
                        <span
                            key={index}
                            className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium"
                        >
                            {day.slice(0, 3)}
                        </span>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                    <button className="flex-1 bg-main/10 text-main py-2 rounded-lg font-medium hover:bg-main/20 transition-colors duration-200">
                        {t('common.edit')}
                    </button>
                    <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors duration-200">
                        {t('common.delete')}
                    </button>
                    <button className="flex-1 bg-yellow-50 text-red-600 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors duration-200">
                        {t('common.pause')}
                    </button>
                </div>
            </div>
        </div>
    )
}
