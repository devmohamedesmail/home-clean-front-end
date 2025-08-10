import React from 'react'
import CleanerNavbar from '../components/cleaner_components/cleaner_navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <CleanerNavbar />
        {children}
    </div>
  )
}
