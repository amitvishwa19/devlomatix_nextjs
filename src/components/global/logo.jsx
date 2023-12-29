
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/assets/images/devlomatix_light.png'



export  function Logo(props) {
  const link = props.link
  //console.log(props)
  //console.log('Logo Loaded')
  
  return (
    <Link href={'/'}>
        <div className='mt-1'>
            <Image src={logo} alt='logo' height={props.size || 150} width={props.size || 150} style={{width:'auto', height:'auto'}} priority='false'></Image>
        </div>
    </Link>
  )
}
