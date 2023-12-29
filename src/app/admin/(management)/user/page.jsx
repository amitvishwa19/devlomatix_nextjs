'use client'

import React from 'react'
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { Separator } from '@/components/ui/separator'

export default function User() {

  const data = getData()

  return (
    <div className="">
      <div>
        <h3 className="text-lg font-medium">Users</h3>
        <p className="text-sm text-muted-foreground mb-4">
          All Users connected with this app
        </p>
        <Separator />
      </div>
      <div>
        <DataTable columns={columns} data={payments} />
      </div>
    </div>
  )
}


export const payments = [
  {
    id: "728ed52f",
    amount: 100,
    status: "Todo",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "Done",
    email: "example@gmail.com",
  },
]

async function getData() {
  // Fetch data from your API here.
  return payments;
}