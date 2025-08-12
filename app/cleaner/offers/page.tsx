'use client'
import CustomInput from '@/app/custom/custom_input';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { MdTitle } from "react-icons/md";
import { MdGroup } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import Cleaner_Offer_Item from '@/app/items/cleaner_offer_item';

interface Offer {
    id: number;
    name: string;
    cleaners: number;
    rate: number;
    options: string[];
    availableDays: string[];
}

export default function OffersPage() {
    const { t } = useTranslation()
    const [offers, setOffers] = useState<Offer[]>([
        {
            id: 1,
            name: "Deep Clean Package",
            cleaners: 3,
            rate: 25,
            options: ["Disinfection", "Extra Textile Clean", "Window Cleaning"],
            availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"]
        },
        {
            id: 2,
            name: "Basic Clean Service",
            cleaners: 2,
            rate: 18,
            options: ["Disinfection", "Air Purification"],
            availableDays: ["Monday", "Wednesday", "Thursday", "Saturday"]
        },
        {
            id: 3,
            name: "Premium Clean Plus",
            cleaners: 4,
            rate: 35,
            options: ["Disinfection", "Extra Textile Clean", "Air Purification", "Carpet Deep Clean", "Kitchen Deep Clean"],
            availableDays: ["Tuesday", "Thursday", "Friday", "Saturday", "Sunday"]
        }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        cleaners: 1,
        rate: 0,
        options: [] as string[],
        availableDays: [] as string[]
    });

    const serviceOptions = [
        "Disinfection",
        "Extra Textile Clean",
        "Air Purification",
        "Window Cleaning",
        "Carpet Deep Clean",
        "Kitchen Deep Clean",
        "Bathroom Deep Clean",
        "Balcony Cleaning"
    ];

    const weekDays = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];

    const handleOptionChange = (option: string) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.includes(option)
                ? prev.options.filter(o => o !== option)
                : [...prev.options, option]
        }));
    };

    const handleDayChange = (day: string) => {
        setFormData(prev => ({
            ...prev,
            availableDays: prev.availableDays.includes(day)
                ? prev.availableDays.filter(d => d !== day)
                : [...prev.availableDays, day]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newOffer: Offer = {
            id: offers.length + 1,
            ...formData
        };
        setOffers([...offers, newOffer]);

        // Reset form
        setFormData({
            name: '',
            cleaners: 1,
            rate: 0,
            options: [],
            availableDays: []
        });

        // Close modal
        (document.getElementById('offer_modal') as HTMLDialogElement)?.close();
    };

    return (
        <div className='container mx-auto px-4 py-8'>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {t('cleaner.offers.title')}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {t('cleaner.offers.description')}
                    </p>
                </div>
                <button
                    className="bg-main hover:bg-main/90 text-white px-5 py-3 text-xs rounded-lg font-medium transition-colors duration-200 shadow-sm"
                    onClick={() => (document.getElementById('offer_modal') as HTMLDialogElement)?.showModal()}
                >
                    {t('cleaner.offers.create')}
                </button>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <Cleaner_Offer_Item offer={offer} t={t} />
                ))}
            </div>

            {/* Create Offer Modal */}
            <dialog id="offer_modal" className="modal">
                <div className="modal-box max-w-2xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-2xl mb-6 text-gray-800">
                        {t('cleaner.offers.create')}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Offer Name */}
                        <div>
                            {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('cleaner.offers.offer_title')}
                            </label> */}

                            <CustomInput
                                label={t('cleaner.offers.offer_title')}
                                icon={<MdTitle />}
                                type="text"
                                placeholder={t('cleaner.offers.offer_title')}
                                value={formData.name}
                                onChange={(e: any) => setFormData(prev => ({ ...prev, name: e.target.value }))}

                            />
                        </div>

                        {/* Number of Cleaners & Rate */}
                        <div className="grid grid-cols-2 gap-4">

                            <CustomInput
                                label={t('cleaner.offers.number_of_cleaners')}
                                icon={<MdGroup />}
                                type="number"
                                min="1"
                                max="10"
                                value={formData.cleaners}
                                onChange={(e: any) => setFormData(prev => ({ ...prev, cleaners: parseInt(e.target.value) }))}
                            />


                            <CustomInput
                                label={t('cleaner.offers.rate_per_hour')}
                                icon={<BiDollar />}
                                type="number"
                                min="1"
                                max="10"
                                value={formData.cleaners}
                                placeholder="25.00"
                                onChange={(e: any) => setFormData(prev => ({ ...prev, cleaners: parseInt(e.target.value) }))}
                            />
                        </div>

                        {/* Service Options */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                {t('cleaner.offers.service_options')}
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {serviceOptions.map((option) => (
                                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.options.includes(option)}
                                            onChange={() => handleOptionChange(option)}
                                            className="w-4 h-4 text-main border-gray-300 rounded focus:ring-main/20"
                                        />
                                        <span className="text-sm text-gray-700">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Available Days */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                {t('cleaner.offers.available_days')}
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                                {weekDays.map((day) => (
                                    <label key={day} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.availableDays.includes(day)}
                                            onChange={() => handleDayChange(day)}
                                            className="w-4 h-4 text-main border-gray-300 rounded focus:ring-main/20"
                                        />
                                        <span className="text-sm text-gray-700">{day}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                                onClick={() => (document.getElementById('offer_modal') as HTMLDialogElement)?.close()}
                            >
                                
                                {t('common.cancel')}
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-main text-white py-3 rounded-lg font-medium hover:bg-main/90 transition-colors duration-200"
                            >
                                {t('common.save')}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}
