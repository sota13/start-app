"use client"

import React from 'react'
import { Button } from '../ui/button'
import {  useRouter } from 'next/navigation'

type Props = {}

const SignupButton = (props: Props) => {

  const router = useRouter()

  const handleSignup = async() => {
    router.push('/signup')
  }
  return (
    <Button onClick={handleSignup}>Sign up</Button>
  )
}

export default SignupButton