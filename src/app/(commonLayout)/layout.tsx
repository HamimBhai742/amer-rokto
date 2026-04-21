import React from 'react'
import Navbar from '@/components/navbar/Navbar'

export default function CommonLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
