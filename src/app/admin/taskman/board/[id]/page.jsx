'use client'
import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '@/redux/reducers/LoaderReducer'
import { setTaskBoard, setColumns, openBoardCrudModal, openTaskCrudModal, openDeleteModal } from '@/redux/reducers/TaskmanReducer'
import { TaskCrud } from './taskCrud'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import moment from 'moment/moment'
import { Button } from "@/components/ui/button"
import { PillerCrudModal } from '../../modal/pillerCrudModal'
import { Icon } from '@/components/global/icon'
import { TaskCrudModal } from '../../modal/taskCrudModal'
import DeleteModal from '../../modal/deleteModal'
import { Icons } from '@/components/ui/icons'


export default function Board() {
    const path = usePathname()
    const dispatch = useDispatch()
    const [board, setBoard] = useState({})
    const { taskBoard, columns } = useSelector(state => state.taskman)


    const getBoardDetails = async () => {
        try {
            dispatch(showLoading())
            await axios.get('/api/v1/taskman/board/' + path.split('board/')[1])
                .then((req) => {
                    //console.log(req.data.data)
                    dispatch(setTaskBoard(req.data.data))
                })
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(hideLoading())
        }
    }

    const getColumns = async () => {
        try {
            await axios.get('/api/v1/taskman/board/piller/' + path.split('board/')[1])
                .then((req) => {
                    console.log(req.data.data)
                    dispatch(setColumns(req.data.data))

                })
        } catch (error) {

        }

    }

    useEffect(() => {
        getBoardDetails()
        //getColumns()
        //console.log(path.split('taskman/')[1])
    }, [])

    const handleOpenBoardCrud = () => {
        //console.log('Board Crud Modal')
        dispatch(openBoardCrudModal())
    }

    const openDeleteModal = ()=>{

    }


    return (
        <div className='h-full '>
            <PillerCrudModal />
            
            <div className=''>
                <div className='flex justify-between'>
                    <div>
                        <h3 className="text-lg font-medium">{taskBoard?.title}</h3>
                        <p className="text-xs text-muted-foreground mb-4">
                            {taskBoard?.description}
                        </p>
                    </div>
                    <div className='flex gap-2'>
                        
                        <Button variant='outline' size='sm' onClick={handleOpenBoardCrud} className='gap-2'>
                            <Icon name={'AlignEndHorizontal'} size={16}/>
                            New Piller
                        </Button>
                    </div>

                </div>
                <Separator className='mb-5' />

                {
                    taskBoard?.pillers?.length > 0 ?
                        <div className='flex '>
                            {

                                taskBoard?.pillers?.map((piller) => {
                                    return (
                                        <div key={piller._id} className='rounded-sm  h-full mr-2 md:min-w-[280px]'>
                                            <div className=' '>
                                                <div className='mb-4 mx-1'>
                                                    <div>
                                                        <PillerTitleBlock piller={piller} />
                                                        {
                                                            piller?.tasks?.map((task) => {
                                                                return (
                                                                    <TaskBlock key={task._id} task={task} />
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div> :
                        <div className='flex items-center justify-center h-full'>
                            <div className='font-medium text-sm'>
                                No Piller found,
                                <span className='cursor-pointer mx-2 font-bold' onClick={handleOpenBoardCrud}>
                                    Create Piller
                                </span>
                                for this board
                            </div>
                        </div>
                }

            </div>

        </div>
    )


}

const PillerTitleBlock = ({ piller }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const deletePiller = async () => {
        try {
            console.log('DElete piller')
            setLoading(true)
            await axios.delete('/api/v1/taskman/board/piller/' + piller._id)
                .then((res) => {
                    console.log(res.data)
                })
        } catch (error) {
            console.log(error)
        } finally {
            setOpen(false)
            setLoading(false)
        }
    }

    const DeletePiller = () => {
        return (
            <Dialog open={open} onOpenChange={() => { setOpen(true) }}>
                <DialogTrigger asChild>
                    <div className='cursor-pointer'>
                        <Icon name={'Trash2'} size={16} />
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Piller</DialogTitle>
                        <DialogDescription>
                            This will delete this Piller and all the associated Task
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button size='sm' variant='outline' onClick={() => { setOpen(false) }}>Cancel</Button>
                        <Button disabled={loading} size='sm' onClick={deletePiller}>
                            {loading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    const handleOpenTaskCrud = () => {
        //console.log('Board Crud Modal')
        dispatch(openTaskCrudModal())
    }

    const onDelete = ()=>{
        console.log('Delete function called')
    }


    return (
        <div className='text-md text-gray-500 mb-4 text-inherit'>
            <div className='flex dark:bg-slate-800 bg-gray-200 p-2 rounded-md justify-between px-4 items-center'>
                <div className='flex gap-2 capitalize font-bold '>
                    {piller?.title}
                    <span>({piller?.tasks?.length})</span>
                </div>
                <div className='flex items-center gap-2'>
                    <TaskCrudModal data={piller} type={'add'} />
                    <DeleteModal type={'piller'} piller={piller._id}/>
                </div>
            </div>
        </div>
    )
}

const TaskBlock = ({ task }) => {

    const priorityClass = () => {

        if (task.priority === 'low') {
            return 'p-2 border-green-400 border-t-2'
        }

        if (task.priority === 'medium') {
            return 'p-2 border-blue-400 border-t-2'
        }

        if (task.priority === 'high') {
            return 'p-2 border-orange-400 border-t-2'
        }

        if (task.priority === 'critical') {
            return 'p-2 border-red-400 border-t-2'
        }

    }


    return (
        <div className='flex-col border rounded-md mb-4  text-muted-foreground dark:bg-slate-800 overflow-hidden'>
            <div className={'p-2'}>
                <div className='flex text-xs p-1 dark:bg-gray-700 bg-gray-200 rounded-sm mb-2 justify-between'>
                    <div>{moment(task.createdAt).calendar()}</div>
                    <div className='capitalize'>{task.priority}</div>
                </div>
                <div className='text-sm font-bold mb-2'>
                    {task.title}
                </div>
                <div className='text-xs font-semibold '>
                    {task.description.substring(0, 50)}
                </div>
            </div>
        </div>
    )
}

