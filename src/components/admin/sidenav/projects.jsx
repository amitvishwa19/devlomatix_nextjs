import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from '@radix-ui/react-dialog'
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios'
import toast from 'react-hot-toast'
import { icons  } from 'lucide-react';




export function Projects() {
  const [data, setData] = useState({ title: '', description: '' })
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([])


  useEffect(() => {
    allProjects()
  }, [])

  const closeModal = () => {
    setOpen(false)
    setData({ title: '', description: '' })
  }
  const allProjects = async () => {
    try {
      const res = await axios.get('/api/admin/project')
        .then((data) => {
          setProjects(data.data.data)

        })


    } catch (error) {
      console.log(error)
    }

  }

  const newProject = async () => {
    try {
      if (data.title === '') {
        return toast.error('Please provide title of project')
      }

      if (data.title.length > 20) {
        return toast.error('Project title should not more than 20 characters')
      }

      const res = await axios.post('/api/admin/project', data)
      setData({ title: '', description: '' })
      setOpen(false)
    } catch (error) {
      setData({ title: '', description: '' })
      setOpen(false)
      return toast.error('Error while adding new Project, Try again')
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => { setOpen(true) }}>

      <div>
        <div className='flex items-center justify-between p-2 m-2'>
          <h2 className='text-md font-semibold tracking-tight'>Project {projects.length}</h2>
          <div>
            <DialogTrigger asChild>
              <div className='cursor-pointer' onClick={() => { }}>
                <AiOutlinePlus />
              </div>
            </DialogTrigger>
          </div>
        </div>
        <ul className='ml-8'>
          {
            projects.map((item, index) => {
              return (
                <li key={index} > {item.title} </li>
              )
            })
          }
        </ul>
      </div>

      

      <DialogContent className="sm:max-w-[620px]" >
        <DialogHeader>
          <DialogTitle>New Menu</DialogTitle>
          <DialogDescription>
            Create new menu here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder='Project Title' className="col-span-3" value={data.title} onChange={(e) => { setData({ ...data, title: e.target.value }) }} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Textarea placeholder="Type your message here." className="col-span-3" value={data.description} onChange={(e) => { setData({ ...data, description: e.target.value }) }} />
          </div>
        </div>
        <DialogFooter>

          <Button variant='outline' onClick={closeModal}>Close</Button>
          <Button onClick={newProject}>Add Project</Button>

        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}




export  function Icon() {
  return (
    <div>x</div>
  )
}
