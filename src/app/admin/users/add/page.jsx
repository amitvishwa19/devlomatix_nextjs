'use client'
import React, { useState } from 'react'
import styles from './adduser.module.css'
import axios from 'axios'
import toast from 'react-hot-toast'



export default function AddUser() {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({ name:'', email: '', password: '' })


    const addUser = async () => {
        try {
            if (user.email === '' || user.password === '') {
                return toast.error('Please provide Email and Password')
            }

            setLoading(true)

            const res = await axios.post('/api/auth/register', user).then(() => {
                toast.success('User added succesfully')
                setUser({name:'', email: '', password: '' })
            })

        } catch (error) {
            toast.error('Something went wrong, please try again ')
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>

            <label htmlFor="">Name</label>
            <input type="text" placeholder='Name' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />

            <label htmlFor="">Email</label>
            <input type="text" placeholder='Email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />


            <label htmlFor="">Password</label>
            <input type="text" placeholder='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />

            <button onClick={addUser}>{loading ? 'Adding user ...' : 'Add User'}</button>


        </div>
    )
}
