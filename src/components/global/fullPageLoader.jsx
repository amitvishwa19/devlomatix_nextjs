'use client'
import React from 'react'
import { Icons } from '@/components/ui/icons'
import { useSelector } from 'react-redux'

export default function FullPageLoader() {

    const {loading} = useSelector(state =>state.loader)

    return (

        loading ?
        <div className='absolute top-0 bg-slate-200 w-full p-1 z-10 h-full opacity-40 flex items-center justify-center'>
            <Icons.spinner className="mr-2 h-10 w-10 animate-spin text-slate-900" />
        </div>
        :<></>
    )
}
