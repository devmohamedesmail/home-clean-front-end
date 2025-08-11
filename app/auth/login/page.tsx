'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdEmail, MdLock } from 'react-icons/md'
import Logo from '../../components/user_components/logo'
import Link from 'next/link'
import CustomInput from '@/app/custom/custom_input'
import SocialLogin from '@/app/components/user_components/social_login'
import CustomSubmitButton from '@/app/custom/custom_submit_button'
import { useFormik } from 'formik';
import RememberMe from '@/app/components/user_components/remember_me'


export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { t, i18n } = useTranslation()



  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">

            {t('common.welcome_back')}
          </h1>
          <p className="text-gray-600">
            {t('common.sign_in_prompt')}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={formik.handleSubmit} className="space-y-6">

            <CustomInput
              label={t('common.email')}
              type="email"
              name="email"
              placeholder={t('common.email')}
              value={formik.values.email}
              onChange={formik.handleChange}
              icon={<MdEmail className="h-5 w-5 text-gray-400" />} />

            {/* Password Field */}
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-black rounded-lg  focus:border-main"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}

            <RememberMe />

            {/* Submit Button */}

            <CustomSubmitButton isLoading={isLoading} t={t} title={t('common.sign_in')} titleLoading={t('common.signing_in')} />
          </form>

          <SocialLogin />

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">

              {t('common.no_account')}
              <Link
                href="/auth/register"
                className="text-main hover:text-blue-700 font-medium transition-colors"
              >
                {t('common.sign_up_here')}
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            {t('common.by_signing_in')}
            <Link href="/terms" className="text-main hover:underline">
              {t('common.terms_of_service')}
            </Link>
            {t('common.and')}
            <Link href="/privacy" className="text-main hover:underline">
              {t('common.privacy_policy')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
