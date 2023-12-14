'use client'

import { trpc } from '@/trpc-client/client'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Users = (props: Props) => {
  // const usersQuery = trpc.user.list.useQuery({limit:10,cursor:'11'})
  const userQuery = trpc.user.profile.useQuery()
  
  if (userQuery.isError) {
    redirect('/signin')
  }
  return (
    <div>
      {/* <h1 className="text-3xl font-semibold">Users {usersQuery.status === 'loading' && '(loading)'}</h1> */}
      <h1 className="text-3xl font-semibold">Users {userQuery.status === 'loading' && '(loading)'}</h1>
      
      <pre>{JSON.stringify(userQuery, null, 2)}</pre>
      {/* <ul>
        {usersQuery.data?.map(us=>(
          <li key={us.id}>{us.email}</li>
        ))}
      </ul> */}

      </div>
  )
}

export default Users