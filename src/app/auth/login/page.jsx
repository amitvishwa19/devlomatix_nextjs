'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Icons } from '@/components/ui/icons'
import { useDispatch } from 'react-redux'
import { setLocalStorage } from '@/redux/reducers/AuthReducer'




export default function Login() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ email: '', password: '' })
  const [msg, setMsg] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {

  }, [])


  const login = async () => {
    
    if (data.email === '' || data.password === '') {
      return toast.error('Please enter Email and Password')
    }

    if (!loading) {
      try {
        setLoading(true)
        const res = await axios.post('/api/v1/auth/login', data)
          .then((data) => {
            //localStorage.setItem('user', JSON.stringify(data.data.data))
            dispatch(setLocalStorage(data.data.data))
            toast.success('Login Success')
            router.replace('/')
          })
      } catch (error) {
        return toast.error(error.response.data.error)
      } finally {
        setLoading(false)
      }
    }
  }

  const googleLogin = (e) => {
    console.log('Google login clicked', e)
  }

  
  return (

    <div className="lg:p-8">

   
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">

        <div className="flex flex-col space-y-2 text-center mb-5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign In to account
          </h1>
        </div>


        <div className={cn("grid gap-6")}>

          <div className="grid gap-4">
            
            <div className="grid gap-2">
              <Label className="" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="example@email.com"
                type="email"
                disabled={loading}
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label className="" htmlFor="email">
                Password
              </Label>
              <Input
                id="password"
                placeholder="*******"
                type="password"
                disabled={loading}
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <div className='flex  text-sm text-muted-foreground mt-1'>
                <Link href={'/forgot'}>
                  <span className='font-semibold text-xs'>Forgot Password</span>
                </Link>
              </div>
            </div>

            <Button disabled={loading} onClick={login}>
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </div>

          <div className='flex justify-center text-sm text-muted-foreground'>
            Dont have account ?
            <Link replace={true} href={'/auth/register'}>
              <span className='ml-2  font-bold'>Sign Up</span>
            </Link>

          </div>


          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" type="button" disabled={false} onClick={() => { toast('Login with google') }}>
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>





          <Button variant="outline" type="button" disabled={false} onClick={() => { toast('Login with github') }}>
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>


        </div>

        <div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

      </div>
    </div>
  )
}
