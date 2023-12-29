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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
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
import { Icon } from '@/components/global/icon'



export function Crud() {
   
    const { modalOpenState, data, type } = useSelector(state => state.cruddialog)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        id: '', title: '', description: '', status: false, permissions: []
    })
    const [permissions, setPermissions] = useState([])
    const [selPermissions, setSelPermissions] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        setFormData({
            id: data._id ? data._id : '',
            title: data.title ? data.title : '',
            description: data.description ? data.description : '',
            status: data.status ? data.status : false,
            permissions: data.permissions ? data.permissions : [],
        })

    }, [data])

    useEffect(() => {
        getPermissions()
    }, [])


    const getPermissions = async () => {
        try {
            await axios.get('/api/admin/permission')
                .then((data) => {
                    //console.log(data.data.data)
                    setPermissions(data.data.data)
                })
        } catch (error) {

        }
    }

    const addData = async () => {
        try {
            //console.log('Add Permission')
            setLoading(true)
            await axios.post(`/api/admin/${module}`, formData)
                .then((data) => {
                    //console.log(data)
                    toast.success('Role added successfully')
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
                .then(() => {
                    toast.success('Role updated successfully')
                })

        } catch (error) {
            console.log(error)
            toast.error('Oops something went wrong')
        } finally {
            setLoading(false)
            dispatch(closeView())
        }
    }

    const deleteData = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/admin/${module}/` + formData.id)
                .then((data) => {
                    toast.success('Role deleted successfully')
                })

        } catch (error) {
            console.log(error)
            toast.error('Oops something went wrong')
        } finally {
            setLoading(false)
            dispatch(closeView())
        }
    }

    const selectPermission = (item) => {

        setFormData({...formData, permissions:[...formData.permissions, item] })
    }

    const removeSelectedPermission = (item)=>{  

        const remaining = formData.permissions.filter((i)=>{
            return i._id !== item._id
        })
        setFormData({...formData, permissions : remaining })
    
    }

    return (
        <Dialog open={modalOpenState} onOpenChange={() => { dispatch(openView({ type: 'add', data: {} })) }} >


            <DialogTrigger asChild>
                <Button variant="outline">Add Role</Button>
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
                                    placeholder='Role Title'
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
                                    placeholder="Tell something about this role"
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
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent  >
                                        <SelectItem value={true}>Active</SelectItem>
                                        <SelectItem value={false}>Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Permissions
                                </Label>
                                <Select onValueChange={selectPermission}>
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Select a permission" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>All Permissions</SelectLabel>
                                            {
                                                permissions.map((item) => {
                                                    return (
                                                        <SelectItem key={item._id} value={item}>{item.title}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                            </div>
                            {
                                formData.permissions.length > 0 ?
                                    <div className='grid grid-cols-4  gap-4'>
                                        <Label htmlFor="username" className="text-right justify-items-start">
                                            Selected Permissions
                                        </Label>

                                        <div className='flex-col'>
                                        {
                                            formData.permissions.map((item,index) => {
                                                return (
                                                    <div key={index} className='flex text-xs  mb-1 font-semibold items-center'>
                                                        {item.title}
                                                        <span className=' cursor-pointer ml-2' onClick={()=>{removeSelectedPermission(item)}}>
                                                            <Icon name={'Trash2'} size={12}/>
                                                        </span>
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>

                                    </div>
                                    : null
                            }
                            
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
                                    placeholder='Role Title'
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
                                    placeholder="Tell something about this role"
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
                            {
                                formData.permissions.length > 0 ?
                                    <div className='grid grid-cols-4  gap-4'>
                                        <Label htmlFor="username" className="text-right justify-items-start">
                                            Selected Permissions
                                        </Label>

                                        <div className='flex-col'>
                                        {
                                            formData.permissions.map((item,index) => {
                                                return (
                                                    <div key={index} className='flex text-xs  mb-1 font-semibold items-center'>
                                                        {item.title}
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>

                                    </div>
                                    : null
                            }
                            
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
                                    placeholder='Role Title'
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
                                    placeholder="Tell something about this role"
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
                                    disabled={loading}
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
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Permissions
                                </Label>
                                <Select onValueChange={selectPermission}>
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Select a permission" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>All Permissions</SelectLabel>
                                            {
                                                permissions.map((item) => {
                                                    return (
                                                        <SelectItem key={item._id} value={item}>{item.title}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                            </div>
                            {
                                formData.permissions.length > 0 ?
                                    <div className='grid grid-cols-4  gap-4'>
                                        <Label htmlFor="username" className="text-right justify-items-start">
                                            Selected Permissions
                                        </Label>

                                        <div className='flex-col'>
                                        {
                                            formData.permissions.map((item,index) => {
                                                return (
                                                    <div key={index} className='flex text-xs  mb-1 font-semibold items-center'>
                                                        {item.title}
                                                        <span className=' cursor-pointer ml-2' onClick={()=>{removeSelectedPermission(item)}}>
                                                            <Icon name={'Trash2'} size={12}/>
                                                        </span>
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>

                                    </div>
                                    : null
                            }
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
                                onClick={updateData}
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
