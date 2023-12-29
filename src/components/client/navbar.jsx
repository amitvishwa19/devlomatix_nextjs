import React, { useContext, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Logo } from '../global/logo'
import ThemeSwitcher from '../global/themeSwitcher'
import { useAuth } from '@/providers/authProvider'
import { AvatarButton } from '../global/avatarButton'
//import { AvatarButton } from '../admin/topnav/avatarBUtton'



export function Navbar() {

  const  { user, getUser } = useAuth()
  

  //const auth = useAuth()
  
  useEffect(() => {
    
  }, [])

  

  return (
    <div className='fixed-top-0 w-full  p-2'>
      <div className='  px-4  shadow-sm bg-slate-100 flex items-center  p-4 border rounded-lg'>
        <div className='md:max-w-screen-3xl mx-auto flex item-center w-full justify-between'>
          <Logo size={120} link={'/'} />
          <div className=' space-x-4 md:w-auto flex items-center  text-sm font-semibold text-gray-600 '>

            {/* <ThemeSwitcher /> */}

            <Link href={'/'}>Home</Link>
            <Link href={'/about'}>About</Link>
            <Link href={'/contact'}>Contact</Link>


           

           <AvatarButton />
          </div>

        </div>
      </div>
    </div>
  )
}
