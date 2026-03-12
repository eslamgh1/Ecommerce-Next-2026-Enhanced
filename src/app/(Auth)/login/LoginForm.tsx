'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '_/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '_/components/ui/form';
import { Input } from '_/components/ui/input';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as zod from "zod"
import { schema } from './login.schema';
import { toast } from 'sonner';
import { cookies } from 'next/headers';
import { LoginFormType } from './login.type';
import { handleLogin } from './login.action';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
//npx shadcn@latest add form
//https://react-hook-form.com/get-started?#IntegratingControlledInputs

export default function LoginForm() {
    const router = useRouter()
    // useForm to handle form  // resolver to validate form
    // mode to validate form onBlur or onChange  // defaultValues to set default values for form
    // control to control form   // handleSubmit to handle form submission
    // watch to watch form values  // formState to get form state // setError to set error
    const reactHookFormObject = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",

        },
    }
    )
    const { control, handleSubmit } = reactHookFormObject

    async function mySubmit(data: LoginFormType) {
        // NExt Auth Login Method

        //1st mahmoud hesham
        // const resOutPut = await signIn("credentials", { ...data , callbackUrl: "/", redirect: false })

        //2nd Huda
        const resOutPut = await signIn("credentials", {
            email: data.email,
            password: data.password,
            callbackUrl: "/",
            redirect: false
        })

        console.log({ resOutPut })

        if (resOutPut?.ok) {
            toast.success("Login Successfully", { position: "top-center", duration: 4000 })
            // router.push("/")
            // to redirect to home page and refresh the page to set cookies
            window.location.href = "/"

        }
        else {
            toast.error("email or password is wrong", { position: "top-center", duration: 4000 })
        }

        // Default Login method - Ignore
        // handleLogin method from server file 'login.action.ts'
        // const resOutPut = await handleLogin(data)

        // if (resOutPut === true) {

        //     toast.success("Login Successfully", { position: "top-center", duration:3000})
        //       router.push("/")

        // } else {
        //     toast.error(resOutPut, { position: "top-center" ,duration:3000})
        // }
    }

    return (
        <div className='w-1/2 mx-auto pt-20 pb-10 flex flex-col gap-5'>
            <h1 className='text-2xl font-bold p-10 text-center'>Register</h1>
            {/* //Form is wrapper not <form */}
            <Form {...reactHookFormObject}>
                <form onSubmit={handleSubmit(mySubmit)}>

                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mb-5">

                                <FormLabel>Email: </FormLabel>
                                <FormControl>
                                    <Input placeholder="write your email" {...field} type="email" />
                                </FormControl>
                                {/* <FormDescription>This is your public display name.</FormDescription> */}
                                {/* //<FormMessage /> Display error message */}
                                <FormMessage />

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="mb-5">

                                <FormLabel>Password: </FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your password" {...field} type="password" />
                                </FormControl>
                                {/* <FormDescription>This is your public display name.</FormDescription> */}
                                {/* //<FormMessage /> Display error message */}
                                <FormMessage />

                            </FormItem>
                        )}
                    />



                    <Button type="submit">Submit</Button>
                </form>
            </Form>



        </div>
    );
}