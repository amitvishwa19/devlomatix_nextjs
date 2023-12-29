import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Logo } from '../global/logo'
import { appConfig } from '@/utils/config'

appConfig


export function Footer() {
  return (
    <div className='fixed bottom-0 w-full p-2 '>
      <div className=' p-4 px-4  bg-slate-100 shadow-sm flex justify-between text-sm rounded-lg font-semibold text-gray-500'>
        <div className='md:max-w-screen-3xl mx-auto flex item-center w-full justify-between'>
          © Copyright {appConfig.app.appName}
          <div className='space-x-4 md:block md:w-auto flex item-center '>
            <Link href={'/'} className='t-sm'>Privacy Policy</Link>
            <Link href={'/'}>Terms & Conditions</Link>
            <span>Version: {appConfig.app.appVersion}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
