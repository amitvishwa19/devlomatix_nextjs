import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from '@/components/ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { openView, closeView } from '@/redux/reducers/CrudDialogReducer'
import { addColumn, addPiller } from '@/redux/reducers/TaskmanReducer'
import { Textarea } from "@/components/ui/textarea"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import toast from 'react-hot-toast'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/global/icon'


export function CreatePiller() {
    const path = usePathname()
    const [piller, setPiller] = useState({
        title: '',
        description: '',
        status: false,
        board: ''
    })
    const { taskBoard } = useSelector(state => state.taskman)
    const { modalOpenState } = useSelector(state => state.cruddialog)

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setPiller({ ...piller, board: path.split('board/')[1] })

    }, [])

    const handleAddColumn = async () => {
        console.log(piller)
        //return

        try {

            if (piller.title === '' || piller.description === '') { return toast.error('Please provide a Piller title and Piller description') }
            setLoading(true)
            await axios.post('/api/v1/taskman/board/piller', piller)
                .then((res) => {
                    setOpen(false)
                    dispatch(addPiller(res.data.data))
                    toast.success('Piller added successfully')
                })

        } catch (error) {
            console.log(error)
            toast.error('Oops ! Column already exists')
            console.log(error.response.data)
        } finally {
            setLoading(false)
            setPiller({
                title: '',
                description: '',
                board: path.split('board/')[1]
            })
            setOpen(false)
        }
    }

    const formClose = () => {
        setOpen(false)
    }


    return (
        <div>
            <Popover open={open} onOpenChange={() => { setOpen(true) }} className='mr-2'>
                <PopoverTrigger asChild>
                    <Button variant="outline" size='sm' className='flex gap-2'>
                         <Icon name={'KanbanSquare'} size={16}/>
                         Add Piller
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={`my-4 gap-4 md:min-w-[540px] sm:min-w-[340px] mr-2 `}>

                    <div className="space-y-2 mb-4">
                        <h4 className="font-medium leading-none">Create New Piller</h4>
                        {/* <p className="text-xs text-muted-foreground">
                            Add new piller or select from avaliable columns
                        </p> */}
                       
                    </div>

                    <div className="grid gap-4 mb-2">
                        <div className="grid w-full  items-center gap-1.5">
                            <Input disabled={loading} type="text" value={piller.title} placeholder="Piller title" onChange={(e) => { setPiller({ ...piller, title: e.target.value }) }} />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Textarea rows='5' disabled={loading} type="text" value={piller.description} placeholder="Piller description" onChange={(e) => { setPiller({ ...piller, description: e.target.value }) }} />
                        </div>

                        <div className="grid w-full  items-center gap-1.5">
                            <Select disabled={loading} onValueChange={(e) => { setPiller({ ...piller, status: e }) }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Board Status" className='text-inherit'/>
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectGroup>
                                        <SelectItem value={true}>Active</SelectItem>
                                        <SelectItem value={false}>InActive</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>




                        <div className='flex justify-end gap-2'>

                            <Button variant="outline" disabled={loading} size='sm' onClick={formClose}>
                                Cancel
                            </Button>

                            <Button  disabled={loading} size='sm' onClick={handleAddColumn}>
                                {loading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Add Piller
                            </Button>


                        </div>

                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
