'use client'
import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { MdEmail, MdLock } from 'react-icons/md'
import Logo from '../../components/user_components/logo'
import Link from 'next/link'
import SocialLogin from '@/app/components/user_components/social_login'
import CustomInput from '@/app/custom/custom_input'
import CustomSubmitButton from '@/app/custom/custom_submit_button'
import { useFormik } from 'formik'
import { AuthContext } from '@/app/context/auth_context'

export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const { t, i18n } = useTranslation()
    const { register } = useContext(AuthContext)!;


    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            setIsLoading(true)
            const response = await register(values)
            console.log("respone"  , response)
            setIsLoading(false)
        }
    })





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
                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* User Type Selection */}



                        <CustomInput
                            name="username"
                            label={t('common.name')}
                            type="text"
                            placeholder={t('common.name')}
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            icon={<FaUser color="black" className="h-5 w-5 text-gray-400" />}
                        />


                        <CustomInput
                            label={t('common.email')}
                            type="email"
                            name="email"
                            placeholder={t('common.email')}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            icon={<MdEmail color="black" className="h-5 w-5 text-gray-400" />}
                        />

                     <CustomInput
                            label={t('common.password')}
                            type="password"
                            name="password"
                            placeholder={t('common.password')}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            icon={<MdLock color="black" className="h-5 w-5 text-gray-400" />}
                        />


                        {/* Password Fields */}
                        {/* <div>
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
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
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
                        </div> */}

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


                        <CustomSubmitButton
                            isLoading={isLoading}
                            t={t}
                            i18n={i18n}
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
