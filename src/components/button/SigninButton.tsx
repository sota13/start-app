"use client"

import React from 'react'
import { Button } from '../ui/button'
import {  useRouter } from 'next/navigation'

type Props = {}

const SigninButton = (props: Props) => {

  const router = useRouter()

  const handleSignin = async() => {
    router.push('/signin')
  }
  return (
    <Button onClick={handleSignin}>Sign in</Button>
  )
}

export default SigninButton