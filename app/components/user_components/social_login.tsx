import React from 'react'
import {  FaGoogle, FaFacebook } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

export default function SocialLogin() {
    const { t } = useTranslation()

  return (
    <div>

         {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('common.or_continue_with')}</span>
              </div>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {}}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
            >
              <FaGoogle className="h-5 w-5 text-red-500 mr-2" />

              {t('common.google')}
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
            >
              <FaFacebook className="h-5 w-5 text-blue-600 mr-2" />
              {t('common.facebook')}
            </button>
          </div>
    </div>
  )
}
