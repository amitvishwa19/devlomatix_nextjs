'use client'
import React, {useContext, useEffect, useState} from 'react'
import { AdminThemeContext } from '@/contexts/adminThemeContext'



export default function AdminThemeProvider({children}) {
    const {admintheme} = useContext(AdminThemeContext)
    const [mounted, setMounted] = useState(false)


    useEffect(() => {
      setMounted(true)
    
    }, [])

    if(mounted){
        return (
            <div className={admintheme}>{children}</div>
          )
    }
    

  
}
