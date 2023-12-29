'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'


export default function Auth() {
    const router = useRouter()


    useEffect(() => {
        router.replace('/auth/login')
    }, [])



    return (
        <div className="flex  h-5/6">


            <div className="mx-auto flex w-full flex-col justify-center  space-y-6 sm:w-[350px]">

             
                

                    <Button  type="button" disabled={false} onClick={() => { router.replace('/auth/login') }}>
                       Login
                    </Button>





                    <Button  type="button" disabled={false} onClick={() => { router.replace('/auth/register') }}>
                        Register
                    </Button>


                </div>

               
        </div>
    )
}
