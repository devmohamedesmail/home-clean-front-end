'use client'

import { IoMdStar, IoMdCheckmark } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { FiUsers, FiClock, FiHome } from "react-icons/fi";
import { useEffect, useState, Suspense } from 'react';
import Navbar from "../../components/user_components/navbar";
import { useSearchParams } from "next/navigation";
import axios from "axios";

// Fake data for cleaning services
const cleaningServices = [
    {
        id: 1,
        name: "Clean Pro Services",
        distance: "2.5 km",
        rating: 4.8,
        reviews: 127,
        cleaners: 3,
        pricePerHour: 180,
        rooms: 4,
        kitchen: true,
        garage: false,
        badge: "Most Popular",
        image: "/api/placeholder/80/80",
        services: ["Deep Cleaning", "Regular Cleaning", "Move-in/out"]
    },
    {
        id: 2,
        name: "Sparkle Home Solutions",
        distance: "4.2 km",
        rating: 4.9,
        reviews: 89,
        cleaners: 5,
        pricePerHour: 220,
        rooms: 6,
        kitchen: true,
        garage: true,
        badge: "Top Rated",
        image: "/api/placeholder/80/80",
        services: ["Premium Cleaning", "Eco-friendly", "Same Day"]
    },
    {
        id: 3,
        name: "Golden Mop Company",
        distance: "1.8 km",
        rating: 4.6,
        reviews: 203,
        cleaners: 4,
        pricePerHour: 160,
        rooms: 3,
        kitchen: true,
        garage: false,
        badge: "Best Value",
        image: "/api/placeholder/80/80",
        services: ["Basic Cleaning", "Weekly Service", "Affordable"]
    },
    {
        id: 4,
        name: "Elite Cleaning Experts",
        distance: "6.1 km",
        rating: 4.7,
        reviews: 156,
        cleaners: 6,
        pricePerHour: 280,
        rooms: 8,
        kitchen: true,
        garage: true,
        badge: "Premium Service",
        image: "/api/placeholder/80/80",
        services: ["Luxury Cleaning", "24/7 Available", "Certified"]
    },
    {
        id: 5,
        name: "Fresh Start Cleaners",
        distance: "3.7 km",
        rating: 4.5,
        reviews: 92,
        cleaners: 2,
        pricePerHour: 140,
        rooms: 2,
        kitchen: false,
        garage: false,
        badge: "Budget Friendly",
        image: "/api/placeholder/80/80",
        services: ["Basic Service", "Student Discount", "Quick Clean"]
    },
    {
        id: 6,
        name: "Diamond Clean Co.",
        distance: "5.3 km",
        rating: 4.9,
        reviews: 234,
        cleaners: 7,
        pricePerHour: 320,
        rooms: 10,
        kitchen: true,
        garage: true,
        badge: "Luxury Service",
        image: "/api/placeholder/80/80",
        services: ["VIP Service", "High-end Properties", "White Glove"]
    }
];

export default function ResultsPage() {
    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <ResultsContent />
            </Suspense>
        </div>
    )
}

function ResultsContent() {
    const searchParams = useSearchParams();
    const address = searchParams.get("address");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const [data, setData] = useState(null);
    const [filters, setFilters] = useState({
        rooms: '',
        cleaners: '',
        priceRange: [0, 400],
        kitchen: '',
        garage: ''
    });

    const [sortBy, setSortBy] = useState('rating');

    // Filter and sort logic would go here
    const filteredServices = cleaningServices.filter(service => {
        if (filters.rooms && service.rooms < parseInt(filters.rooms)) return false;
        if (filters.cleaners && service.cleaners < parseInt(filters.cleaners)) return false;
        if (service.pricePerHour < filters.priceRange[0] || service.pricePerHour > filters.priceRange[1]) return false;
        if (filters.kitchen === 'yes' && !service.kitchen) return false;
        if (filters.kitchen === 'no' && service.kitchen) return false;
        if (filters.garage === 'yes' && !service.garage) return false;
        if (filters.garage === 'no' && service.garage) return false;
        return true;
    });





const fetch_companies_date = async () => {
    
    try {
        const response = await axios.get(`https://clean-home-backend.onrender.com/api/companies?populate=*`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            }
        });
        
        setData(response.data.data);
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    fetch_companies_date();
}, []);

    return (
        <div>
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Cleaning Services Near You
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Found {filteredServices.length} services in your area
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium text-gray-700">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main"
                            >
                                <option value="rating">Highest Rated</option>
                                <option value="price">Lowest Price</option>
                                <option value="distance">Closest</option>
                                <option value="reviews">Most Reviews</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Results Section */}
                    <div className="lg:col-span-3 space-y-6">
                        {filteredServices.map((service) => (
                            <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Service Image */}
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center">
                                            <FiHome className="w-8 h-8 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Service Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                                                    <span className="bg-main text-white text-xs px-2 py-1 rounded-full font-medium">
                                                        {service.badge}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <IoLocationOutline className="w-4 h-4" />
                                                        <span>{service.distance}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FiUsers className="w-4 h-4" />
                                                        <span>{service.cleaners} cleaners</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <IoMdStar
                                                                key={i}
                                                                className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                        <span className="text-sm font-medium text-gray-700 ml-1">
                                                            {service.rating} ({service.reviews} reviews)
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {service.services.map((serviceType, index) => (
                                                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                                                            {serviceType}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-6 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <FiHome className="w-4 h-4 text-gray-500" />
                                                        <span>Up to {service.rooms} rooms</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <IoMdCheckmark className={`w-4 h-4 ${service.kitchen ? 'text-green-500' : 'text-gray-300'}`} />
                                                        <span>Kitchen</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <IoMdCheckmark className={`w-4 h-4 ${service.garage ? 'text-green-500' : 'text-gray-300'}`} />
                                                        <span>Garage</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price Section */}
                                            <div className="flex-shrink-0 text-right">
                                                <div className="bg-gray-50 rounded-xl p-4 min-w-[140px]">
                                                    <p className="text-sm text-gray-600 mb-1">Starting from</p>
                                                    <p className="text-2xl font-bold text-gray-900">{service.pricePerHour} AED</p>
                                                    <p className="text-sm text-gray-600">per hour</p>
                                                    <button className="w-full bg-main hover:bg-main/90 text-white font-medium py-2 px-4 rounded-lg mt-3 transition-colors duration-200">
                                                        Book Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredServices.length === 0 && (
                            <div className="text-center py-12">
                                <FiHome className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                            </div>
                        )}
                    </div>

                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>

                            <div className="space-y-6">
                                {/* Number of Rooms */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Minimum Rooms
                                    </label>
                                    <select
                                        value={filters.rooms}
                                        onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main"
                                    >
                                        <option value="">Any</option>
                                        <option value="1">1+ rooms</option>
                                        <option value="2">2+ rooms</option>
                                        <option value="3">3+ rooms</option>
                                        <option value="4">4+ rooms</option>
                                        <option value="5">5+ rooms</option>
                                        <option value="6">6+ rooms</option>
                                    </select>
                                </div>

                                {/* Number of Cleaners */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Minimum Cleaners
                                    </label>
                                    <select
                                        value={filters.cleaners}
                                        onChange={(e) => setFilters({ ...filters, cleaners: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main"
                                    >
                                        <option value="">Any</option>
                                        <option value="1">1+ cleaners</option>
                                        <option value="2">2+ cleaners</option>
                                        <option value="3">3+ cleaners</option>
                                        <option value="4">4+ cleaners</option>
                                        <option value="5">5+ cleaners</option>
                                    </select>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price Range (AED/hour)
                                    </label>
                                    <div className="space-y-3">
                                        <input
                                            type="range"
                                            min="0"
                                            max="400"
                                            value={filters.priceRange[1]}
                                            onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>0 AED</span>
                                            <span>{filters.priceRange[1]} AED</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Kitchen Option */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kitchen Cleaning
                                    </label>
                                    <select
                                        value={filters.kitchen}
                                        onChange={(e) => setFilters({ ...filters, kitchen: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main"
                                    >
                                        <option value="">Any</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>

                                {/* Garage Option */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Garage Cleaning
                                    </label>
                                    <select
                                        value={filters.garage}
                                        onChange={(e) => setFilters({ ...filters, garage: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main"
                                    >
                                        <option value="">Any</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>

                                {/* Clear Filters */}
                                <button
                                    onClick={() => setFilters({
                                        rooms: '',
                                        cleaners: '',
                                        priceRange: [0, 400],
                                        kitchen: '',
                                        garage: ''
                                    })}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
