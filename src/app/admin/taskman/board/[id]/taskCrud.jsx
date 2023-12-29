'use client'
import React, { useEffect, useState } from 'react'
import { openView, closeView } from '@/redux/reducers/CrudDialogReducer'
import { addTask } from '@/redux/reducers/TaskmanReducer'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from '@/components/ui/icons'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Icon } from '@/components/global/icon'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useSelector, useDispatch } from 'react-redux'
import { usePathname } from 'next/navigation'


const formSchema = z.object({
    board: z.string()
        .min(2, {
            message: "Task title should be minium of 5 character",
        }),
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
    piller: z.string({

    }),
    priority: z.string({
        required_error: "Please select a priority.",
    }),
})


export function TaskCrud({ mode }) {
    const path = usePathname()
    const board = path.split('board/')[1]
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { modalOpenState, data, type } = useSelector(state => state.cruddialog)
    const { taskBoard } = useSelector(state => state.taskman)
    const dispatch = useDispatch()



    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            board: board,
            title: '',
            description: '',
            status: 'false',
            priority: 'low'
        },
        mode: "onChange",
    })

    const onSubmit = async (data, e) => {
        console.log('Form Submit', mode)
        if (mode === 'add') {
            handleAddTask(data)
        }

    }

    const handleAddTask = async (data) => {
        try {
            setLoading(true)
            await axios.post('/api/v1/taskman/board/task', data)
                .then((res) => {
                    dispatch(addTask(res.data.data))
                    toast.success('Task added successfully')
                    form.reset();
                    console.log(res.data.data)
                })
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
            dispatch(closeView())
        }
    }

    const closeForm = () => {
        form.reset();
        setOpen(false)
    }

   

    return (

        <Popover open={open} onOpenChange={() => { setOpen(true) }}>
            <PopoverTrigger asChild>
                <Button size='sm' variant="gost focus:ring-0 p-0 m-0 ">
                    <Icon name={'FilePlus'} size={16}/>
                </Button>
            </PopoverTrigger>


            <PopoverContent className="md:min-w-[540px] sm:min-w-[340px] mr-2 dark:bg-slate-800">

                <div className="space-y-2 mb-4">
                    <h4 className="font-medium leading-none">Create Task</h4>
                    {/* <p className="text-xs text-muted-foreground">
                            Add new piller or select from avaliable columns
                        </p> */}
                </div>


                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="board"
                            className='grid grid-cols-4 items-center gap-4'
                            render={({ field }) => (
                                <FormItem >
                                    <FormControl>
                                        <Input type='hidden' {...field} />
                                    </FormControl>
                                    <FormMessage className='text-xs text-inherit' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            className='grid grid-cols-4 items-center gap-4'
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className='text-inherit'>Title</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage className='text-xs text-inherit' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className='text-inherit'>Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows='6' {...field} />
                                    </FormControl>
                                    <FormMessage className='text-xs text-inherit' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-inherit'>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Task Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={'true'}>Active</SelectItem>
                                            <SelectItem value={'false'}>Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className='text-xs text-orange-200' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-inherit'>Priority</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Priority" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem selected value={'low'}>Low</SelectItem>
                                            <SelectItem value={'medium'}>Medium</SelectItem>
                                            <SelectItem value={'high'}>High</SelectItem>
                                            <SelectItem value={'critical'}>Critical</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className='text-xs text-orange-200' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="piller"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-inherit'>Column</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Coulmn" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                taskBoard.pillers.map((item) => {
                                                    return (
                                                        <SelectItem key={item._id} value={item._id}>{item.title}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className='text-xs text-orange-200' />
                                </FormItem>
                            )}
                        />

                    </form>
                </Form>

                <div className='flex gap-2 mt-4 justify-end'>
                    <Button disabled={loading} variant='outline' size='sm' onClick={closeForm}>
                        Close
                    </Button>

                    <Button disabled={loading} size='sm' onClick={form.handleSubmit(onSubmit)}>
                        {loading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Add
                    </Button>
                </div>
            </PopoverContent>

        </Popover>
    )
}
