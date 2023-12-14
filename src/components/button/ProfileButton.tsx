"use client"

import React from 'react'
import { Button } from '../ui/button'
import {  useRouter } from 'next/navigation'

type Props = {}

const ProfileButton = (props: Props) => {

  const router = useRouter()

  const handleGoProfile = async() => {
    router.push('/profile')
  }
  return (
    <Button onClick={handleGoProfile}>Profile</Button>
  )
}

export default ProfileButton