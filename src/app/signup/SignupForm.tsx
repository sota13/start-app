"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { trpc } from "@/trpc-client/client"
import { useUserContext } from "@/context/AuthContext"
import { useRouter } from 'next/navigation'

interface SignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    email: z.string().min(2).max(50),
    password: z.string().min(3, {
      message: "password must be at least 3 characters.",
    }).max(50)
  })

export function SignupForm({ className, ...props }: SignupFormProps) {

  const { setUser } = useUserContext()
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
      firstName:'',
      lastName:''
    },
  })

  const {mutate:signup, isLoading} = trpc.user.signup.useMutation()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
     signup(values, {
      onSettled(data, error, variables, context) {
        console.log(data)
        if(data?.user) setUser(data.user)
        router.push("/profile")
      },
      onError(err){
        console.log(err)
      }
     })
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">

          <div className="grid gap-1">
          <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First name</FormLabel>
            <FormControl>
              <Input placeholder="your first name" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
          </div>
          <div className="grid gap-1">
          <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last name</FormLabel>
            <FormControl>
              <Input placeholder="your last name" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
          </div>
          <div className="grid gap-1">
          <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="email@gmail.com" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
          </div>
          <div className="grid gap-1">
          <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input {...field} type="password"/>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
          </div>

          <Button disabled={isLoading} className="my-4">
            {isLoading && (
              <Loader2 className='mr-4 h-4 w-4 animate-spin' />
            )}
            Sign Up
          </Button>
        </div>
      </form>
      </Form>

    </div>
  )
}