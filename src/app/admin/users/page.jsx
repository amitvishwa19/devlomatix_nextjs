'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MdSearch } from "react-icons/md";
import Link from 'next/link';
import Image from "next/image";
import { Separator } from '@/components/ui/separator';


const Users = () => {
  const pathname = usePathname();
  const [users, setUsers] = useState([])

  useEffect(() => {
    getData()

  }, [])



  const getData = async () => {
    let data = await fetch("http://localhost:3000/api/user")
    data = await data.json()
    setUsers(data.result)

  }

  return (
    <div>
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage app settings and set preferences.
        </p>
        <Separator />
      </div>
      <div>

        <div className={styles.top}>
          <h1>{pathname.split("/").pop()}</h1>
          <Link href="/admin/users/add">
            <button className={styles.addButton}>Add New</button>
          </Link>
        </div>

        {
          users.length > 0
            ?
            <table className={styles.table}>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Created At</td>
                  <td>Role</td>
                  <td>Status</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <div className={styles.user}>

                        {user.name}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.createdAt?.toString().slice(4, 16)}</td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className={styles.buttons}>
                        <Link href={`/admin/users/${user._id}`}>
                          <button className={`${styles.button} ${styles.view}`}>
                            View
                          </button>
                        </Link>
                        <form action={{}}>
                          <input type="hidden" name="id" value={(user.id)} />
                          <button className={`${styles.button} ${styles.delete}`}>
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            :
            <div className={styles.noData}>
              <h4>No Data Found</h4>
            </div>
        }


      </div>


    </div>
  )
}
export default Users