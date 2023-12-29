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
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from '@/components/ui/icons'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox } from "@/components/ui/checkbox"



export function Crud() {
    
    const { modalOpenState, data, type } = useSelector(state => state.cruddialog)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ id:'', title: '', description: '', status: false })
    const dispatch = useDispatch()

    useEffect(() => {
        
        setFormData({
            id:data?._id ? data?._id : '',
            title: data?.title ? data?.title : '',
            description: data?.description ? data?.description : '',
            status: data?.status ? data?.status : false
        })
        
    }, [data])

    const addData = async () => {
        try {
            //console.log('Add Permission')
            setLoading(true)
            await axios.post(`/api/admin/${module}`, formData)
                .then((data) => {
                    //console.log(data)
                    toast.success('Permission added successfully')
                })
        } catch (error) {
            //console.log(error.message)
            toast.error('Oops something went wrong')
        } finally {
            setLoading(false)
            dispatch(closeView())
        }
    }

    const updateData = async () => {
        try {
            setLoading(true)
            const res = await axios.put(`/api/admin/${module}/` + formData.id, formData)
            .then(()=>{
                toast.success('Permission updated successfully')
            })
            
        } catch (error) {
            toast.error('Oops something went wrong')
        }finally{
            setLoading(false)
            dispatch(closeView())
        }
    }

    const deleteData = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/admin/${module}/` + formData.id)
            .then(()=>{
                toast.success('Permission deleted successfully')
            })
            
        } catch (error) {
            toast.error('Oops something went wrong')
        } finally {
            setLoading(false)
            dispatch(closeView())
        }
    }

    return (
        <Dialog open={modalOpenState} onOpenChange={() => { dispatch(openView({ type: 'add', data: {} })) }} >


            <DialogTrigger asChild>
                <Button variant="outline">Add Permission</Button>
            </DialogTrigger>

            <DialogContent className="md:max-w-[625px] dark:bg-red-200">

                <DialogHeader>
                    <DialogTitle>

                        {type === 'add' ?
                            'Add New Permission' :
                            null
                        }

                        {type === 'view' ?
                            data.title :
                            null
                        }

                        {type === 'edit' ?
                            'Edit : ' + data.title :
                            null
                        }

                        {type === 'delete' ?
                            'Delete : ' + data.title :
                            null
                        }

                    </DialogTitle>
                </DialogHeader>

                {
                    type === 'add' ?
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="role"
                                    placeholder='Permission Title'
                                    className="col-span-3"
                                    disabled={loading}
                                    value={formData.title}
                                    onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    rows='5'
                                    placeholder="Tell something about this permission"
                                    disabled={loading}
                                    className="col-span-3"
                                    value={formData.description}
                                    onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Status
                                </Label>
                                <Select onValueChange={(e) => { setFormData({ ...formData, status: e }) }}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent  >
                                        <SelectItem value={true}>Active</SelectItem>
                                        <SelectItem value={false}>Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        : null
                }

                {
                    type === 'view' ?
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="role"
                                    placeholder='Permission Title'
                                    className="col-span-3"
                                    disabled
                                    value={formData.title}
                                    onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    rows='5'
                                    placeholder="Tell something about this permission"
                                    disabled
                                    className="col-span-3"
                                    value={formData.description}
                                    onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Status
                                </Label>
                                <Select
                                    disabled
                                    onValueChange={(e) => { setFormData({ ...formData, status: e }) }}
                                    defaultValue={formData.status}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent  >
                                        <SelectItem selected value={true}>Active</SelectItem>
                                        <SelectItem value={false}>Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        : null
                }

                {
                    type === 'edit' ?
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="role"
                                    placeholder='Permission Title'
                                    className="col-span-3"
                                    disabled={loading}
                                    value={formData.title}
                                    onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    rows='5'
                                    placeholder="Tell something about this permission"
                                    disabled={loading}
                                    className="col-span-3"
                                    value={formData.description}
                                    onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Status
                                </Label>
                                <Select
                                    disabled = {loading}
                                    onValueChange={(e) => { setFormData({ ...formData, status: e }) }}
                                    defaultValue={formData.status}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent  >
                                        <SelectItem selected value={true}>Active</SelectItem>
                                        <SelectItem value={false}>Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        : null
                }

                {
                    type === 'delete' ?
                        <div>
                            This action cannot be undone. This will permanently delete this record from our servers.
                        </div>
                        : null
                }

                <DialogFooter>
                    <Button onClick={() => {
                        dispatch(closeView())
                    }} variant='outline' type="submit">Close</Button>



                    {
                        type === 'add' ?
                            <Button
                                onClick={addData}
                                type="submit"
                                disabled={loading}
                            >
                                {loading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Add
                            </Button> :
                            null
                    }

                    {
                        type === 'edit' ?
                            <Button
                                onClick={ updateData }
                                type="submit"
                                disabled={loading}
                            >
                                {loading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Update
                            </Button> :
                            null
                    }

                    {
                        type === 'delete' ?
                            <Button
                                onClick={deleteData}
                                type="submit"
                                disabled={loading}
                            >
                                {loading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Delete
                            </Button> :
                            null
                    }

                </DialogFooter>


            </DialogContent>
        </Dialog>
    )
}
