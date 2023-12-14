import HomeButton from '@/components/button/HomeButton'
import SignoutButton from '@/components/button/SignoutButton'
import { getUserFromToken } from '@/lib/auth'
import { serverClient } from '@/trpc-client/serverClient'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

async function Profile({}: Props) {

  let user = null

  
  try {
    
    user = await serverClient.user.profile()
  }catch(error) {
    
    redirect('/signin')
    
  }

  console.log(user,'ggggggggggggggggg')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-5 p-24">
      <h1>this is a profile page</h1>
      <h6>{user?.profile?.firstName}</h6>
      <div className="flex justify-center items-start space-x-5">
      <SignoutButton/>
      <HomeButton/>
      </div>
    </main>
  )
}

export default Profile