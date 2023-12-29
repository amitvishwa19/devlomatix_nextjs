import React from 'react'
import { Input } from '@/components/ui/input'

export function Search() {
    return (
        <div className='hidden md:flex'>
            <div className='hidden md:flex'>
                <Input
                    type="search"
                    placeholder="Search..."
                    className="md:w-[100px] lg:w-[300px] focus-visible:ring-0"
                />
            </div>
        </div>
    )
}
