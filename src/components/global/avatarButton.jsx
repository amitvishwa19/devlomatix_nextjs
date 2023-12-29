import React from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"
import toast from 'react-hot-toast'
import img from '@/assets/images/devlomatix.png'
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlinePoweroff } from "react-icons/ai";
import axios from 'axios'
import { useAuth } from '@/providers/authProvider'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { logoutUser } from '@/redux/reducers/AuthReducer'





export function AvatarButton() {
    const router = useRouter()
    const auth = useAuth()
    const { authStatus, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const logout = async () => {
        await axios.get('/api/v1/auth/logout')
        .then((res)=>{
            dispatch(logoutUser())
            toast.success('Logout success')
            router.replace('/')
        })
    }

    const login = () => {
        router.push('/auth/login')
    }

    Link

    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={img.src} alt="@shadcn" />
                        <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>

                {
                    authStatus ?
                        <div>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.user?.username}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.user?.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>

                                {/* <DropdownMenuItem onClick={() => { router.push('/admin/profile') }}>
                                    Profile
                                    <DropdownMenuShortcut>
                                        <AiOutlineUser />
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem> */}

                                {/* <DropdownMenuItem onClick={() => { router.push('/admin') }}>
                                    Admin
                                    <DropdownMenuShortcut>
                                        <AiOutlineUser />
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem> */}

                                {/* <DropdownMenuItem onClick={() => { router.push('/admin/settings') }}>
                                    Settings
                                    <DropdownMenuShortcut>
                                        <AiOutlineSetting />
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem> */}



                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                        </div> :
                        null
                }
  

                {
                    authStatus ?
                        <DropdownMenuItem onClick={logout}>
                            Log out
                            <DropdownMenuShortcut>
                                <AiOutlinePoweroff />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem> :
                        <DropdownMenuItem onClick={login}>
                            Login
                            <DropdownMenuShortcut>
                                <AiOutlinePoweroff />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                }


            </DropdownMenuContent>
        </DropdownMenu>
    )
}
