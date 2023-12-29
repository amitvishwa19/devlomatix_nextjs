'use client'
import React from 'react'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import coverImage from '@/assets/images/auth_cover_image.jpg'
import { Logo } from '@/components/global/logo'
import { Provider } from 'react-redux'
import store from '@/redux/store/store'


export default function Layout({ children }) {

    return (
        <Provider store={store}>
            
            
        <div className='min-h-screen flex'>

            <div className="container relative  h-full flex-col md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

                <div className="relative hidden h-full flex-col bg-muted  text-white dark:border-r lg:flex  overflow-hidden min-h-screen max-h-screen">
                    <Image src={coverImage} alt='cover' priority='false' fill='cover' sizes='1000' />
                </div>

                <div className='p-10  min-h-screen max-h-screen'>
                    <div className='flex  justify-center mb-10'>
                        <Logo size={150} Link={'/'} />
                    </div>

                    {children}
                </div>

            </div>

            <Toaster position='top-right' />
        </div>
        </Provider>
    )
}
