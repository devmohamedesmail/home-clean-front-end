import React from 'react'

export default function CustomSubmitButton({ isLoading, t , i18n , title , titleLoading }: any) {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-main hover:bg-second text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {titleLoading}
                </div>
            ) : (
                <div className={`flex items-center justify-center ${i18n.language === 'ar' ? 'arabic-font' : ''}`}>
                    {title}
                </div>
            )}
        </button>
    )
}
