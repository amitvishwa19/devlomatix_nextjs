import React from 'react'





export default function User(params) {
  return (
    <div>User</div>
  )
}

export async function generateStaticParams(){
  return [{'user':'1'}, {'user':'2'}]
}
