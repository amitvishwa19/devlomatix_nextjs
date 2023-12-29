
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/assets/images/devlomatix.png'
import { AiOutlineHome } from "react-icons/ai";



export function LogoAdmin(props) {
  return (
    <Link href={'/admin'} className=''>
      <div className='flex  item-center justify-center font-bold gap-1 '>
        <Image src={logo} alt='logo' height={props.size || 50} width={props.size || 50} style={{ width: 'auto', height: 'auto' }} priority='false' className=''></Image>
        <span className='text-md font-bold item-center justify-center mt-1'>Devlomatix</span>
      </div>
    </Link>
  )
}
