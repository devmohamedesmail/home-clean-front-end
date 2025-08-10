'use client'
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoMdTime } from "react-icons/io";
import Logo from "./logo";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { autocomplete } from '../../lib/google';
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js';

export default function Hero() {
    const { t, i18n } = useTranslation();
    const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
    const [query, setQuery] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const fetchPredictions = async () => {
            const predictions = await autocomplete(query);
            setPredictions(predictions ?? []);
            console.log("Predictions:", predictions);
        }
        fetchPredictions();

    }, [query])


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16">
            <div className="container px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)]">
                    {/* first column */}
                    <div className='py-8 lg:py-0 space-y-8'>
                        <div className="mb-6">
                            <Logo />
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-3xl md:text-4xl lg:text-4xl  font-bold leading-tight text-gray-900">

                                {t('homepage.hero.title')}

                                <span className="block text-main mt-2">
                                    {t('homepage.hero.subtitle')}
                                </span>
                            </h1>
                            <p className="text-md md:text-md text-gray-600 leading-relaxed max-w-xl">
                                {t('homepage.hero.description')}
                            </p>


                        </div>

                        {/* Professional Form */}
                        <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100'>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('homepage.hero.searchaddress')}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <CiSearch className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="address"
                                            type="search"
                                            value={query}
                                            onChange={(e) => {
                                                setQuery(e.target.value);
                                                setAddress(e.target.value);
                                            }}
                                            className="block w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-xl focus:outline-none  focus:border-main transition-all duration-200"
                                            placeholder="Enter your address or location"
                                        />
                                    </div>
                                </div>


                                <div className="relative">
                                    <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 divide-y divide-gray-100">
                                        {predictions.map((prediction) => (
                                            <li
                                                key={prediction.place_id}
                                                onClick={() => {
                                                    setAddress(prediction.description);
                                                    setQuery(prediction.description);
                                                    setPredictions([]);
                                                }}
                                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 flex items-start space-x-3 group"
                                            >
                                                <div className="flex-shrink-0 mt-1">
                                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                                                        {prediction.description}
                                                    </p>
                                                    {prediction.structured_formatting && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {prediction.structured_formatting.secondary_text}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">

                                            {t('homepage.hero.preferreddate')}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <SlCalender className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="date"
                                                type="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="block w-full pl-12 pr-4 py-4 text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('homepage.hero.preferredtime')}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <IoMdTime className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="time"
                                                type="time"
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                className="block w-full pl-12 pr-4 py-4 text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='pt-4'>
                                    <Link
                                        href={{
                                            pathname: "/userpages/results",
                                            query: {
                                                address,
                                                date,
                                                time
                                            }
                                        }}

                                        className="w-full bg-main hover:bg-main/90 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2">
                                        {t('homepage.hero.cta')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* second column - Image */}
                    <div className="relative order-first lg:order-last">
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                            <img
                                src="/images/banner1.jpeg"
                                alt="Professional home cleaning service"
                                className="w-full h-auto object-cover max-h-[600px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-6 -left-6 w-20 h-20 bg-main/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
