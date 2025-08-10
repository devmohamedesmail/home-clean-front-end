'use client'
import React, { useState } from 'react'

interface Offer {
    id: number;
    name: string;
    cleaners: number;
    rate: number;
    options: string[];
    availableDays: string[];
}

export default function OffersPage() {
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
                    <h1 className="text-3xl font-bold text-gray-800">My Offers</h1>
                    <p className="text-gray-600 mt-2">Manage your cleaning service offers</p>
                </div>
                <button 
                    className="bg-main hover:bg-main/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md"
                    onClick={() => (document.getElementById('offer_modal') as HTMLDialogElement)?.showModal()}
                >
                    + Create New Offer
                </button>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <div key={offer.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.name}</h3>
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {offer.cleaners} Cleaners
                                </span>
                                <span className="text-main font-bold text-lg">${offer.rate}/hr</span>
                            </div>
                        </div>

                        {/* Service Options */}
                        <div className="mb-4">
                            <h4 className="font-medium text-gray-700 mb-2">Services Included:</h4>
                            <div className="flex flex-wrap gap-1">
                                {offer.options.map((option, index) => (
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
                            <h4 className="font-medium text-gray-700 mb-2">Available Days:</h4>
                            <div className="flex flex-wrap gap-1">
                                {offer.availableDays.map((day, index) => (
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
                                    Edit
                                </button>
                                <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors duration-200">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Offer Modal */}
            <dialog id="offer_modal" className="modal">
                <div className="modal-box max-w-2xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    
                    <h3 className="font-bold text-2xl mb-6 text-gray-800">Create New Offer</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Offer Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Offer Name</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20"
                                placeholder="e.g., Deep Clean Package"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                                required
                            />
                        </div>

                        {/* Number of Cleaners & Rate */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Cleaners</label>
                                <input 
                                    type="number" 
                                    min="1"
                                    max="10"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20"
                                    value={formData.cleaners}
                                    onChange={(e) => setFormData(prev => ({...prev, cleaners: parseInt(e.target.value)}))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Rate per Hour ($)</label>
                                <input 
                                    type="number" 
                                    min="0"
                                    step="0.01"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20"
                                    placeholder="25.00"
                                    value={formData.rate}
                                    onChange={(e) => setFormData(prev => ({...prev, rate: parseFloat(e.target.value)}))}
                                    required
                                />
                            </div>
                        </div>

                        {/* Service Options */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Service Options</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-3">Available Days</label>
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
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                className="flex-1 bg-main text-white py-3 rounded-lg font-medium hover:bg-main/90 transition-colors duration-200"
                            >
                                Create Offer
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}
