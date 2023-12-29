'use client'
import React, { useState, useContext, useEffect } from 'react'
import { BiSun } from "react-icons/bi";
import { BiMoon } from "react-icons/bi";
import { AdminThemeContext } from '@/contexts/adminThemeContext';



export default function AdminThemeSwitcher() {
    const [light, setLight] = useState(true)
    const { admintheme, toggle } = useContext(AdminThemeContext)

    useEffect(() => {
        admintheme === 'light' ? setLight(true) : setLight(false)
    }, [admintheme])

    return (

        <span className='' onClick={toggle} style={{ cursor: 'pointer' }}>
            {
                light ? <BiMoon size={20} color='bg-slate-900'/> : <BiSun size={20} color='text-indigo-400'/>
            }
        </span>

    )
}
