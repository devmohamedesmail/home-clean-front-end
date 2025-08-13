'use client'
import React, { useContext, useState } from 'react'
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
import { AuthContext } from '@/app/context/auth_context'


export default function Login() {

  const [isLoading, setIsLoading] = useState(false)
  const { t, i18n } = useTranslation();




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
              icon={<MdEmail className="h-5 w-5 text-gray-400" />} 
            />

          

            <CustomInput
              label={t('common.password')}
              type="password"
              name="password"
              placeholder={t('common.password')}
              value={formik.values.password}
              onChange={formik.handleChange}
              icon={<MdLock className="h-5 w-5 text-gray-400" />} 
            />

            {/* Remember Me & Forgot Password */}

            <RememberMe />

            {/* Submit Button */}

            <CustomSubmitButton
              i18n={i18n}
              isLoading={isLoading}
              t={t}
              title={t('common.sign_in')}
              titleLoading={t('common.signing_in')} />
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
