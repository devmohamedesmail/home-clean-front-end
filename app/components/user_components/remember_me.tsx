import React from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function RememberMe() {
    const { t } = useTranslation()
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-main focus:ring-main border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">

                    {t('common.remember_me')}
                </label>
            </div>
            <Link
                href="/auth/forgot-password"
                className="text-sm text-main hover:text-blue-700 font-medium transition-colors"
            >
                {t('common.forgot_password')}
            </Link>
        </div>
    )
}
