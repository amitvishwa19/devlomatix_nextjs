'use client'
import React, { useState, useEffect } from 'react'
import {columns } from "./columns"
import { DataTable } from "./data-table"
import { Separator } from '@/components/ui/separator'
import {useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '@/redux/reducers/LoaderReducer'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Crud } from './crud'


export default function Permission() {
  const { modalOpenState, data } = useSelector(state => state.cruddialog)
  const [formData, setFormData] = useState({ title: '', description: '', active: false })

  const [addDialog, setAddDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [permissions, setPermissions] = useState([])
  const dispatch = useDispatch()



  useEffect(() => {
    getPermissions();
  }, [])


  useEffect(() => {
    getPermissions();
  }, [modalOpenState])
  

  const getPermissions = async () => {
    try {
      dispatch(showLoading())
      await axios.get('/api/admin/permission')
      .then((data)=>{
        setPermissions(data.data.data)
        //console.log(data.data.data)
      })
    } catch (error) {
        toast.error('Somethin went wrong while getting permissions, pkease try again later')
    }finally{
      dispatch(hideLoading())
    }
  }

  const addPermission = async () => {
    try {
      console.log('Add Permission')
      setLoading(true)
      await axios.post('/api/admin/permission',formData)
        .then((data) => {
          console.log(data)
          getPermissions()
          toast.success('Permission added successfully')
        })
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
      setOpen(false)
      setFormData({title:'', description:''})
    }
  }

  return (
    <div className="">

      <div>
        <div className='flex items-center justify-between'>

          <div >
            <h3 className="text-lg font-medium">Permissions</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All Permissions avaliable with this app
            </p>
          </div>

          <div >

            <Crud />
            
            {/* <Dialog open={viewModal} onOpenChange={() => { dispatch(openView()) }} >


              <DialogTrigger asChild>
                <Button variant="outline">Add Permission</Button>
              </DialogTrigger>

              <DialogContent className="md:max-w-[625px] dark:bg-red-200">

                <DialogHeader>
                  <DialogTitle>Add New Permission</DialogTitle>
                </DialogHeader>

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
                      placeholder="Tell something about this permission"
                      disabled={loading}
                      className="col-span-3"
                      value={formData.description}
                      onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
                    />
                  </div>
                </div>


                <DialogFooter>
                  <Button onClick={() => {
                    //setOpen(false)
                    //setLoading(false)
                    dispatch(closeView())
                  }} variant='outline' type="submit">Cancel</Button>
                  <Button
                    onClick={addPermission}
                    type="submit"
                    disabled={loading}
                  >

                    {loading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Add</Button>
                </DialogFooter>

              </DialogContent>
            </Dialog> */}

          </div>

        </div>
        <Separator />
      </div>

      <div>
        <DataTable columns={columns} data={permissions} />
      </div>
      
      {/* <View /> */}
      
    </div>
  )
}


