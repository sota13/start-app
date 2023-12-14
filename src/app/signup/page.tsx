import Link from 'next/link'
import React from 'react'
import { SignupForm } from './SignupForm'


function Signup() {
  return (
    <div className="p-4 lg:p-8">
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password below to create your account
        </p>
      </div>
      <SignupForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Already have an account{" "}
        <Link
          href="/signin"
          className="underline underline-offset-4 hover:text-primary"
        >
          Signin
        </Link>
      </p>
    </div>
  </div>
  )
}

export default Signup