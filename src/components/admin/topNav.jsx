import React from 'react'
import toast from 'react-hot-toast'
import AdminThemeSwitcher from '../global/adminThemeSwitcher'
import { Search } from './topnav/search'
import { AvatarButton } from '../global/avatarButton'



export function TopNav() {
    return (
        <div className='border rounded-md  dark:bg-[#071A2B]'>
            <div className='flex items-center px-4'>
                <div className="ml-auto flex items-center space-x-4 text-gray-600">
                    <div className=' rounded-md  dark:bg-[#071A2B]'>
                        <div className='flex p-3 items-center px-4'>
                            <div className="ml-auto flex items-center space-x-4 text-gray-600">
                                <Search />
                                <AdminThemeSwitcher />
                                <AvatarButton />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


