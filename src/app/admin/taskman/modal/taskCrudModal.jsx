'use client'
import { useState } from "react"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux"
import { Input } from "@/components/ui/input"
import { closeTaskCrudModal, addTask, openTaskCrudModal } from "@/redux/reducers/TaskmanReducer"
import { usePathname } from "next/navigation"
import axios from "axios"
import { Icon } from "@/components/global/icon"


export function TaskCrudModal({ data, type }) {
    const dispatch = useDispatch()
    const { taskCrudModal } = useSelector(state => state.taskman)
    const [loading, setLoading] = useState(false)
    const path = usePathname()

    const formSchema = z.object({
        title: z.string()
            .min(2, {
                message: "Task title should be minium of 5 character",
            }),
        description: z.string()
            .min(10, {
                message: "Task description should be minium of 10 character",
            }),
        status: z.string({
            required_error: "Please select a status.",
        }),
        board: z.string(),
        piller: z.string()

    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            status: 'pending',
            board: path.split('board/')[1],
            piller: data._id
        },
        mode: "onChange",
    })

    const onSubmit = async (data, e) => {
        console.log(data)
        try {
            setLoading(true)
            await axios.post('/api/v1/taskman/board/task', data)
                .then((res) => {
                    dispatch(addTask(res.data.data))
                    toast.success('Task added successfully')
                    form.reset();
                    //console.log(res.data.data)
                })
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
            dispatch(closeTaskCrudModal())
        }
    }

    const closeModal = () => {
        form.reset();
        dispatch(closeTaskCrudModal())
    }

    const handleOpenTaskCrud = () => {
        //console.log('Board Crud Modal')
        dispatch(openTaskCrudModal())
    }


    return (

        <div>
            <div onClick={handleOpenTaskCrud} className='cursor-pointer'>
                <Icon name={'FilePlus'} size={16} />
            </div>
            <div>
                {
                    taskCrudModal ?
                        <div className='dark:bg-[#071A2B] bg-white absolute right-0 bottom-0 top-0 w-full md:w-[460px] rounded-md p-4 border'>
                            <div className='flex justify-between items-center'>
                                <div className='font-bold'>Create new Task</div>
                                <Button disabled={loading} variant='outline' size='sm' onClick={closeModal}>
                                    Close
                                </Button>
                            </div>

                            <div className='mt-4'>
                                <Form {...form} >
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            disabled={loading}
                                            control={form.control}
                                            name="title"
                                            className='grid grid-cols-4 items-center gap-4'
                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormLabel className='text-inherit'>Title</FormLabel>
                                                    <FormControl>
                                                        <Input  {...field} />
                                                    </FormControl>
                                                    <FormMessage className='text-xs text-red-500 italic' />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            disabled={loading}
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormLabel className='text-inherit'>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea rows='10'  {...field} />
                                                    </FormControl>
                                                    <FormMessage className='text-xs text-red-500 italic' />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            disabled={loading}
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='text-inherit'>Status</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Piller Status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value={'pending'}>Pending</SelectItem>
                                                            <SelectItem value={'wip'}>Work In Progress</SelectItem>
                                                            <SelectItem value={'onhold'}>On Hold</SelectItem>
                                                            <SelectItem value={'completed'}>COmpleted</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className='text-xs text-red-500 italic' />
                                                </FormItem>
                                            )}
                                        />

                                    </form>
                                </Form>
                            </div>
                            <div className='flex gap-2 justify-end mt-4'>
                                <Button disabled={loading} size='sm' variant='outline' onClick={form.handleSubmit(onSubmit)}>
                                    {loading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Add Task
                                </Button>
                            </div>

                        </div>
                        : null
                }
            </div>
        </div>
    )
}