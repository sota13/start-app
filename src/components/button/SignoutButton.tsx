"use client"

import React from 'react'
import { Button } from '../ui/button'
import {  useRouter } from 'next/navigation'
import { useUserContext } from '@/context/AuthContext'

type Props = {}

const SignoutButton = (props: Props) => {
  const { setUser } = useUserContext()
  const router = useRouter()

  const handleSignout = async() => {
    await fetch('api/users/signout')
    console.log('sign in')
    setUser(null)
    router.push('/')
  }
  return (
    <Button onClick={handleSignout}>Sign out</Button>
  )
}

export default SignoutButton