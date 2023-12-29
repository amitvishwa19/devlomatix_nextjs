'use client'
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import Appearance from './(modules)/appreance'
import General from './(modules)/general'
import Notification from './(modules)/notification'
import Auth from "./(modules)/auth";
import AppMenu from "./(modules)/menu";
import { Icon } from "@/components/global/icon";
import { usePathname } from "next/navigation";
import Link from "next/link";


export default function SettingLayout({ children }) {
    const path = usePathname()
    const [module, setModule] = useState('general')
    const ico = 'Icons.google'


    const selectItem = (e) => {
        setItem(e.target.innerHTML)
    }

    useEffect(() => {
        console.log(path)
    }, [])


    return (
        <div>

            <div>
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Manage app settings and set preferences.
                </p>
                <Separator />
            </div>

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 mt-10">


                <aside className=" lg:w-1/6  ">
                    <ul className='flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 text-sm font-semibold gap-3 cursor-pointer p-2 text-muted-foreground'>
                        <li id='general' onClick={(e) => { setModule('general') }}>
                            <Link href={'/admin/setting'}>
                                <div className={cn("flex items-center gap-2", module === 'general' ? 'text-blue-400' : null)} >
                                    <Icon name="Cog" size={18} />
                                    General
                                </div>
                            </Link>
                        </li>
                        <li id='appereance' onClick={(e) => { setModule('appereance') }}>
                            <div className={cn("flex items-center gap-2", module === 'appereance' ? 'text-blue-400' : null)}>
                                <Icon name='Monitor' size={18} />
                                Appereance
                            </div>
                        </li>
                        <li id='appmenu' onClick={(e) => { setModule('appmenu') }}>
                            <div className={cn("flex items-center gap-2", module === 'appmenu' ? 'text-blue-400' : null)}>
                                <Icon name='MenuSquare' size={18} />
                                App Menu
                            </div>
                        </li>
                        <li id='appmenu' onClick={(e) => { setModule('task') }}>
                            <Link href={'/admin/setting/task'}>
                                <div className={cn("flex items-center gap-2", module === 'appmenu' ? 'text-blue-400' : null)}>
                                    <Icon name='ClipboardList' size={18} />
                                    Task Profiler
                                </div></Link>
                        </li>
                        <li id='notification' onClick={(e) => { setModule('notification') }}>
                            <div className={cn("flex items-center gap-2", module === 'notification' ? 'text-blue-400' : null)}>
                                <Icon name='BellRing' size={18} />
                                Notifications
                            </div>
                        </li>

                        <li id='auth' onClick={(e) => { setModule('profile') }}>
                            <Link href={'/admin/setting/profile'}>
                                <div className={cn("flex items-center gap-2", module === 'auth' ? 'text-blue-400' : null)}>
                                    <Icon name='User' size={18} />
                                    Profile
                                </div>
                            </Link>
                        </li>

                        <li id='auth' onClick={(e) => { setModule('auth') }}>
                            <div className={cn("flex items-center gap-2", module === 'auth' ? 'text-blue-400' : null)}>
                                <Icon name='Fingerprint' size={18} />
                                Auth
                            </div>
                        </li>
                    </ul>
                </aside>

                <div className="flex-1 lg:max-w-2xl">

                    {children}

                </div>

            </div>

        </div>
    )
}
