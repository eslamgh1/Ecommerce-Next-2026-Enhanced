'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '_/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '_/components/ui/form';
import { Input } from '_/components/ui/input';
import React, { useState } from 'react'
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
    const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(true)
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
        
        setIsLoading(false)
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center px-4 py-12'>
            <div className='w-full max-w-md'>
                {/* Logo and Title */}
                <div className='text-center mb-8'>
                    <div className='w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className='text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>Welcome Back</h1>
                    <p className='text-gray-600'>Sign in to your ShopHub account</p>
                </div>

                {/* Form Card */}
                <div className='bg-white rounded-2xl shadow-xl p-8 border border-white/20 backdrop-blur-lg'>
                    <Form {...reactHookFormObject}>
                        <form onSubmit={handleSubmit(mySubmit)} className='space-y-6'>

                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter your email" 
                                                {...field} 
                                                type="email" 
                                                className="h-12 px-4 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter your password" 
                                                {...field} 
                                                type="password" 
                                                className="h-12 px-4 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full h-12 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Signing In...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>
                    </Form>

                    {/* Sign Up Link */}
                    <div className='mt-6 text-center'>
                        <p className='text-gray-600'>
                            Don&apos;t have an account?{' '}
                            <a href='/register' className='text-blue-600 hover:text-blue-700 font-semibold'>Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}