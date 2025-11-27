"use client";





import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {
    const path = usePathname();
  return (
    <div className='flex flex-row justify-between p-4 items-center bg-secondary shadow-md'>
        <h1 className='text-blue-700 text-2xl font-bold'>AI Mock</h1>
        <ul className='flex gap-5'>
            <li className={`text-primary ${path == '/' && "text-blue-600 font-semibold"} hover:text-blue-600 cursor-pointer`}>Home</li>
            <li className={`text-primary ${path == '/dashboard' && "text-blue-600 font-semibold"} hover:text-blue-600 cursor-pointer`}>Dashboard</li>
            <li className={`text-primary ${path == '/upgrade' && "text-blue-600 font-semibold"} hover:text-blue-600 cursor-pointer`}>Upgrade</li>
            <li className={`text-primary ${path == '/questions' && "text-blue-600 font-semibold"} hover:text-blue-600 cursor-pointer`}>Questions</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header