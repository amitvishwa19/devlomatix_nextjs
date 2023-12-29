'use client'
import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Icons } from '@/components/ui/icons'
import { NewBoard } from './board/newBoard'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '@/redux/reducers/LoaderReducer'
import { setTaskBoards, setTaskBoard, openBoardCrudModal, closeBoardCrudModal, addTaskBoard } from '@/redux/reducers/TaskmanReducer'
import axios from 'axios'
import Link from 'next/link'
import {
    ChevronDownIcon,
    CircleIcon,
    PlusIcon,
    StarIcon,
} from "@radix-ui/react-icons"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icon } from '@/components/global/icon'
import { BoardCrudModal } from './modal/boardCrudModal'
import { useRouter } from 'next/navigation'


export default function Taskman() {
    const dispatch = useDispatch()
    const { taskBoards } = useSelector(state => state.taskman)


    const getBoards = async () => {

        try {
            dispatch(showLoading())
            await axios.get('/api/v1/taskman/')
                .then((res) => {
                    dispatch(setTaskBoards(res.data.data))
                })
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getBoards()
    }, [])

    const handleOpenBoardCrud = () => {
        //console.log('Board Crud Modal')
        dispatch(openBoardCrudModal())
    }


    return (
        <div className=" h-full" >
            
            <div>
                <div className='flex justify-between items-center'>
                    <div>
                        <h3 className="text-lg font-medium">Taskman</h3>
                        <p className="text-xs text-muted-foreground mb-4">
                            Manage your task and priority
                        </p>
                    </div>
                    <BoardCrudModal />
                </div>

                <Separator className='mb-5' />

                {
                    taskBoards.length > 0 ?
                        <div className='grid sm:grid-cols-2  md:grid-cols-3 gap-2'>

                            {
                                taskBoards.map((item) => {
                                    return <div key={item._id}>
                                        <Link href={'/admin/taskman/board/' + item._id}>
                                            <BoardCard data={item} />
                                        </Link>
                                    </div>
                                })
                            }

                        </div> :
                        <div className='flex items-center justify-center h-full'>
                            <div className='font-medium text-sm'>
                                No Taskboard found,
                                <span className='cursor-pointer mx-2 font-bold' onClick={handleOpenBoardCrud}>
                                    Click here
                                </span>
                                to create first Task Board
                            </div>
                        </div>
                }

            </div>



        </div>
    )
}

function BoardCard({ data }) {
    const dispatch = useDispatch()
    const router = useRouter()


    const goToBoard = () => {

        router.push('/admin/taskman/board/' + data._id)
    }

    const deleteBoard = () => {
        console.log('delete board', data._id)

    }


    return (
        <div className='dark:bg-slate-800 bg-gray-100 border rounded-md p-2 shadow-sm'>
            <div className='text-md font-bold'>
                {data.title}
            </div>
            <div className='text-xs font-medium text-inherit mt-2'>
                {data.description.substring(0, 40)}
            </div>
        </div>
        
    )


    

}




