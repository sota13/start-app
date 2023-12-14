"use client"

import React from 'react'
import { Button } from '../ui/button'
import {  useRouter } from 'next/navigation'

type Props = {}

const HomeButton = (props: Props) => {

  const router = useRouter()

  const handleGoHome = async() => {
    router.push('/')
  }
  return (
    <Button onClick={handleGoHome}>Home</Button>
  )
}

export default HomeButton