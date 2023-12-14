import Link from 'next/link'
import React from 'react'
import { SigninForm } from './SigninForm'


function Signin() {
  return (
    <div className="p-4 lg:p-8 mt-20">
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Signin to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password below to signin to your accoun
        </p>
      </div>
      <SigninForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Don't have an account{" "}
        <Link
          href="/signup"
          className="underline underline-offset-4 hover:text-primary"
        >
          Signup
        </Link>
      </p>
    </div>
  </div>
  )
}

export default Signin