'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openView, closeView } from '@/redux/reducers/CrudDialogReducer'
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
})


export function Profiler() {
    const [loading, setLoading] = useState(false)
    const { modalOpenState, data, type } = useSelector(state => state.cruddialog)
    const dispatch = useDispatch()


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
        },
        mode: "onChange",
    })

    const onSubmit = async (data, e) => {
        try {
            setLoading(true)
            await axios.post('/api/taskman/board', data)
                .then((data) => {
                    toast.success(data.data.message)
                    form.reset();
                    console.log(data)
                })
        } catch (error) {

        }finally{
            
            setLoading(false)
            dispatch(closeView())
        }
    }

    return (

        <Dialog open={modalOpenState} onOpenChange={() => { dispatch(openView({ type: 'add' })) }}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" >Profiler</Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[625px] dark:bg-red-200">

                <DialogHeader>
                    <DialogTitle>Create new Board</DialogTitle>
                </DialogHeader>

                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            className='grid grid-cols-4 items-center gap-4'
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className='text-inherit'>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Unique title for your task" {...field} />
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
                                        <Textarea rows='4' placeholder="Breif description about this task" {...field} />
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
                                                <SelectValue placeholder="Board Status" />
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

                    </form>
                </Form>


                <DialogFooter >

                    <Button disabled={loading} variant='outline' size='sm' onClick={() => { dispatch(closeView()) }}>
                        Close
                    </Button>

                    <Button disabled={loading} size='sm' onClick={form.handleSubmit(onSubmit)}>
                        {loading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
