'use client'
import axios from 'axios'
import React, { useEffect } from 'react'


export default function Projects() {

  const getData = async()=>{
    
    //const response = await axios.get('/api/admin/project')

    //console.log(response)
  }

  useEffect(() => {
    getData()
  }, [])
  


  return (
    <div>Projects</div>
  )
}
