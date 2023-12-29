'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons'
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default function Verify() {
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter()

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || '');
    
  }, [])

  useEffect(() => {

    //verifyEmail();

  }, [token])



  const verifyEmail = async () => {
    try {
      setLoading(true)


      const res = await axios.post('/api/v1/auth/verifyemail', { token: token })
        .then((data) => {
          console.log(data)
          toast.success('Email verified successfully, Login to continue')
          router.replace('/login')
        })

    } catch (error) {
      setError(true)
      toast.error('Invalid link or activation link is expired')
      router.replace('/forgot')
    }finally{
      setLoading(false)
    }
  }

  const resendLink = () => {
    toast.success('New activation link send to below email address')
    router.push('/auth/login')
  }


  return (
    <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">

                <div className="flex flex-col space-y-2 text-center mb-5">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-600">
                        Click to verify
                    </h1>
                </div>


                <div className="grid gap-6">

                    <div className="grid gap-4">
                        


                        <Button disabled={loading} onClick={verifyEmail} >
                            {loading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Verify
                        </Button>

                        <div className='flex justify-center text-sm text-muted-foreground'>
                            Already have account !
                            <Link replace={true} href={'/login'} className='font-bold'>
                                <span className='ml-2'>Log In</span>
                            </Link>
                        </div>

                    </div>

                </div>

            </div>
        </div>
  )
}
