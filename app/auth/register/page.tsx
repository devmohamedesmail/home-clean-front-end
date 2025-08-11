'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaUser, FaPhone } from 'react-icons/fa'
import { MdEmail, MdLock } from 'react-icons/md'
import Logo from '../../components/user_components/logo'
import Link from 'next/link'
import SocialLogin from '@/app/components/user_components/social_login'
import CustomInput from '@/app/custom/custom_input'
import CustomSubmitButton from '@/app/custom/custom_submit_button'

export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userType: 'customer' // customer or cleaner
    })
    const [isLoading, setIsLoading] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const { t, i18n } = useTranslation()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!')
            return
        }

        if (!agreedToTerms) {
            alert('Please agree to the terms and conditions')
            return
        }

        setIsLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Handle registration logic here
        console.log('Registration attempt:', formData)
        setIsLoading(false)
    }

    const handleSocialLogin = (provider: string) => {
        console.log(`Register with ${provider}`)
        // Handle social registration logic here
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <Logo />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t('common.create_account')}
                    </h1>
                    <p className="text-gray-600">
                        {t('common.join_cleanhome')}
                    </p>
                </div>

                {/* Registration Form */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* User Type Selection */}


                        {/* Name Fields */}
                        {/* <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                {t('common.name')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="First name"
                                    required
                                />
                            </div>
                        </div> */}
                        <CustomInput
                            label={t('common.name')}
                            type="text"
                            placeholder={t('common.name')}
                            value={formData.lastName}
                            onChange={handleInputChange}
                            icon={<FaUser className="h-5 w-5 text-gray-400" />}
                        />

                        {/* Email Field */}
                        {/* <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                {t('common.email')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdEmail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div> */}
                        <CustomInput
                            label={t('common.email')}
                            type="email"
                            placeholder={t('common.email')}
                            value={formData.email}
                            onChange={handleInputChange}
                            icon={<MdEmail className="h-5 w-5 text-gray-400" />}
                        />

                        {/* Phone Field */}


                        {/* Password Fields */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">

                                {t('common.password')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                                    ) : (
                                        <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="h-4 w-4 text-main focus:ring-main border-gray-300 rounded mt-1"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">

                                {t('common.agree_terms')}
                                <Link href="/terms" className="text-main hover:text-blue-700 font-medium">

                                    {t('common.terms_of_service')}
                                </Link>{' '}
                                {t('common.and')}{' '}
                                <Link href="/privacy" className="text-main hover:text-blue-700 font-medium">
                                    {t('common.privacy_policy')}
                                </Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        {/* <button
                            type="submit"
                            disabled={isLoading || !agreedToTerms}
                            className="w-full bg-main hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>

                                    {t('common.creating_account')}
                                </div>
                            ) : (

                                <span>{t('common.create_account')}</span>

                            )}
                        </button> */}
                        <CustomSubmitButton
                            isLoading={isLoading}
                            t={t}
                            title={t('common.create_account')}
                            titleLoading={t('common.creating_account')} />
                    </form>

                    {/* Divider */}


                    {/* Social Registration Buttons */}
                    <SocialLogin />

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">

                            {t('common.have_account')}
                            <Link
                                href="/auth/login"
                                className="text-main hover:text-blue-700 font-medium transition-colors"
                            >
                                {t('common.sign_in_here')}
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-xs text-gray-500">
                        By creating an account, you agree to receive promotional emails and updates about our services.
                    </p>
                </div>
            </div>
        </div>
    )
}
