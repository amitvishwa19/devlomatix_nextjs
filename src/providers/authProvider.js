'use client'
import { appConfig } from '@/utils/config'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import toast from 'react-hot-toast'
import { useRouter , redirect } from 'next/navigation'


const AuthContext = createContext({})


export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const pathName = usePathname()
    const [user, setUser] = useState({
        loggedIn: false,
        email: '',
        userId: ''
    })
    const protectedRoutes = ['/', '/admin']

    const logout = async()=>{
        try {
            const res = await axios.get('/api/auth/logout')
                .then(() => {

                    localStorage.removeItem('user')
                    setUser({
                        loggedIn:false,
                        email:'',
                        userId: ''
                    })

                    toast.success('Logout')
                    router.replace('/')
                    
                })
                
        } catch (error) {
            console.log(error.message)
        }
    }

    const getUser = async () => {
        const token = localStorage.getItem('user')
        let tokenData = ''
        
        if(token){
            tokenData = JSON.parse(token)
            setUser({
                loggedIn:true,
                email:tokenData.user.email,
                userId: tokenData.user.id
            })
        }
       

        
    }


    useEffect(() => {
        getUser()
    }, [])




    return <AuthContext.Provider value={{ user, getUser, logout }}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)