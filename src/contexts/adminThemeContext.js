'use client'
import { createContext, useEffect, useState } from 'react'

export const AdminThemeContext = createContext()


const getFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const value = localStorage.getItem('admintheme')
        return value || 'light';
    }
}

export const AdminThemeContextProvider = ({ children }) => {

    const [admintheme, setAdminTheme] = useState(() => {
        return getFromLocalStorage()
    })

    const toggle = ()=>{
        setAdminTheme(admintheme === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
     localStorage.setItem('admintheme', admintheme)
    }, [admintheme])
    

    return (
        <AdminThemeContext.Provider value={{ admintheme, toggle }}>
            {children}
        </AdminThemeContext.Provider>
    )
}