"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { useUserContext } from "@/context/AuthContext"


interface SigninFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(3, {
      message: "password must be at least 3 characters.",
    }).max(50)
  })

export function SigninForm({ className, ...props }: SigninFormProps) {

  const { setUser } = useUserContext()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(values)

    try{

      const res = await fetch('api/users/signin',{
        method:'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(values)
      })
      if(!res.ok) throw new Error('request error')
      const data = await res.json()

      console.log('the date is :', data)
      setUser(data.user)
      router.push("/profile")
      // router.replace("/")

    }catch(err) {
      console.log(err)
    }finally{

      setIsLoading(false)
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
              <Input {...field} type="password" />
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
            Sign In
          </Button>
        </div>
      </form>
      </Form>

    </div>
  )
}