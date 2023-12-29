'use client'
import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '@/contexts/themeContext'
import { BiSun } from "react-icons/bi";
import { BiMoon } from "react-icons/bi";

export default function ThemeSwitcher() {
    const [light, setLight] = useState(true)
    const { theme, toggle } = useContext(ThemeContext)

    useEffect(() => {
     theme === 'light' ? setLight(true) : setLight(false)
    }, [theme])

    return (
       
            <span className='' onClick={toggle} style={{cursor:'pointer'}}>
            {
                    light ? <BiMoon size={20}/> : <BiSun size={20} />
                }
            </span>
        
    )
}
