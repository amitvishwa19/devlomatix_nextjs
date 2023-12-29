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
import { closeBoardCrudModal, addPiller } from "@/redux/reducers/TaskmanReducer"
import { usePathname } from "next/navigation"
import axios from "axios"



export function PillerCrudModal() {
    const dispatch = useDispatch()
    const { boardCrudModal } = useSelector(state => state.taskman)
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

    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            board:path.split('board/')[1],
            status:'true'
        },
        mode: "onChange",
    })

    const onSubmit = async (data, e) => {
        console.log(data)
        try {
             setLoading(true)
            await axios.post('/api/v1/taskman/board/piller', data)
                .then((res) => {
                    dispatch(addPiller(res.data.data))
                    toast.success('Piller added successfully')
                })
        } catch (error) {
            toast.error('Oops ! Column already exists')
            console.log(error)
        } finally {
            setLoading(false)
            dispatch(closeBoardCrudModal())
        }
    }

    const closeModal = () => {
        form.reset();
        dispatch(closeBoardCrudModal())
    }

    return (

        boardCrudModal ?
            <div className='dark:bg-[#071A2B] bg-white absolute right-0 bottom-0 top-0 w-full md:w-[460px] rounded-md p-4 border'>
                <div className='flex justify-between items-center'>
                    <div className='font-bold'>Create new Piller</div>

                </div>

                <div className='mt-4'>
                    <Form {...form} >
                       
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* <FormField
                                hidden
                                disabled={loading}
                                control={form.control}
                                name="board"
                                className='grid grid-cols-4 items-center gap-4'
                                render={({ field }) => (
                                    <FormItem >
                                       
                                        <FormControl>
                                            <Input placeholder="Title for new Board" {...field} />
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-500 italic' />
                                    </FormItem>
                                )}
                            /> */}
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
                                                <SelectItem value={'true'}>Active</SelectItem>
                                                <SelectItem value={'false'}>Inactive</SelectItem>
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
                    <Button disabled={loading} variant='outline' size='sm' onClick={closeModal}>
                        Close
                    </Button>

                    <Button disabled={loading} size='sm' onClick={form.handleSubmit(onSubmit)}>
                        {loading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Add
                    </Button>
                </div>

            </div>
            : null
    )
}