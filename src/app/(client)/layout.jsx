'use client'

import React, { useState, useEffect } from 'react'
import { Navbar } from '@/components/client/navbar'
import { Footer } from '@/components/client/footer'
import HomePage from './home/page'
import { usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/reducers/AuthReducer'





export default function ClientLayout({ children }) {
    const route = usePathname()
    const [home, sethome] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUser())
        route === '/' ?  sethome(true) : sethome(false)
        
    }, [])
    

    return (
        <div className='min-h-screen  '>
            <Navbar />
                <div className='p-4'>
                    {home ? <HomePage /> : children}
                </div>
            <Footer />
        </div>
    )
}