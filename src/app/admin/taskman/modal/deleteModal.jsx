import { Icon } from '@/components/global/icon'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { Icons } from '@/components/ui/icons'
import axios from 'axios'
import { removePiller } from '@/redux/reducers/TaskmanReducer'



export default function DeleteModal({ type, piller }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { deleteModal } = useSelector(state => state.taskman)

    const handleDelete = async() => {

        try {
            setLoading(true)
            if (type === 'piller') {
                await axios.delete('/api/v1/taskman/board/piller/' + piller)
                .then((res)=>{
                    console.log(res.data.data)
                    dispatch(removePiller(res.data.data))
                })
            } else {


            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            toast.success('Item deleated successfully')
            closeModal()
        }
    }

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }


    return (

        <div>
            <div className='cursor-pointer' onClick={openModal}>
                <Icon name={'Trash2'} size={16} />
            </div>
            <div>
                {
                    open ?
                        <div 
                            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  dark:bg-[#00000010] bg-[#00000010] h-full w-full flex items-center justify-center'
                            onClick={()=>{console.log('Background clicked')}}>
                            <div className='dark:bg-[#071A2B] bg-white px-8 py-4 rounded-md my-8 mx-8 w-9/12 md:w-1/3 border'>
                                <div className='mb-8 text-sm font-medium'>
                                    {
                                        type === 'piller' ?
                                            'Are you sure you want to delete this Piller with associated Task and its Subtasks? This action cannot be reversed.' :
                                            ''


                                    }
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Button disabled={loading} variant='outline' size='sm' onClick={closeModal} >
                                        CLose
                                    </Button>
                                    <Button disabled={loading} size='sm' onClick={handleDelete}>
                                        {loading && (
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div> :
                        null
                }
            </div>
        </div>

    )
}
