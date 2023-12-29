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
  const [roles, setRoles] = useState([])
  const dispatch = useDispatch()



  useEffect(() => {
    getData();
  }, [])


  useEffect(() => {
    getData();
  }, [modalOpenState])
  

  const getData = async () => {
    try {
      dispatch(showLoading())
      await axios.get('/api/admin/role')
      .then((data)=>{
        setRoles(data.data.data)
      })
    } catch (error) {
        toast.error('Somethin went wrong while getting roles, please try again later')
    }finally{
      dispatch(hideLoading())
    }
  }

  const addData = async () => {
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
      toast.error('Oops something went wrong')
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
            <h3 className="text-lg font-medium">Roles</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All Roles avaliable with this app
            </p>
          </div>
          <Crud />
        </div>
        <Separator />
      </div>

      <div>
        <DataTable columns={columns} data={roles} />
      </div>
      
      {/* <View /> */}
      
    </div>
  )
}


