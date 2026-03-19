'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '_/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '_/components/ui/form';
import { Input } from '_/components/ui/input';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as zod from "zod"
import { schema } from './register.schema';
import { RegisterFormType } from './register.type';
import { handleRegister } from './register.action';
import { toast } from 'sonner';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';

//npx shadcn@latest add form
//https://react-hook-form.com/get-started?#IntegratingControlledInputs


export default function RegisterForm() {
    // Reminder: useRouter is a client component hook so it should be used in client components
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const reactHookFormObject = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
    }
    )
    const { control, handleSubmit } = reactHookFormObject

    async function mySubmit(data: RegisterFormType) {
        setIsLoading(true)
        const resOutPut = await handleRegister(data)
        // console.log({resOutPut})

        if (resOutPut === true) {

            toast.success("Registerd Successfully", { position: "top-center", duration:3000})
            router.push("/")

          
        } else {
            toast.error(resOutPut, { position: "top-center" ,duration:3000})
        }
        
        setIsLoading(false)
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12'>
            <div className='w-full max-w-md'>
                {/* Logo and Title */}
                <div className='text-center mb-8'>
                    <div className='w-16 h-16 bg-linear-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className='text-3xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2'>Create Account</h1>
                    <p className='text-gray-600'>Join ShopHub and start shopping</p>
                </div>

                {/* Form Card */}
                <div className='bg-white rounded-2xl shadow-xl p-8 border border-white/20 backdrop-blur-lg'>
                    <Form {...reactHookFormObject}>
                        <form onSubmit={handleSubmit(mySubmit)} className='space-y-5'>
                            <FormField
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter your full name" 
                                                {...field} 
                                                type="text" 
                                                className="h-12 px-4 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
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
                                                className="h-12 px-4 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter your phone number" 
                                                {...field} 
                                                type="tel" 
                                                className="h-12 px-4 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
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
                                                placeholder="Create a password" 
                                                {...field} 
                                                type="password" 
                                                className="h-12 px-4 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={control}
                                name="rePassword"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel className="text-gray-700 font-medium">Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Confirm your password" 
                                                {...field} 
                                                type='password' 
                                                className="h-12 px-4 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='flex items-center gap-2 text-sm'>
                                <input type='checkbox' className='rounded border-gray-300 text-purple-600 focus:ring-purple-500' />
                                <label className='text-gray-600 hover:text-gray-800 cursor-pointer'>
                                    I agree to the{' '}
                                    <a href='#' className='text-purple-600 hover:text-purple-700 font-medium'>Terms of Service</a>
                                    {' '}and{' '}
                                    <a href='#' className='text-purple-600 hover:text-purple-700 font-medium'>Privacy Policy</a>
                                </label>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full h-12 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </form>
                    </Form>

                    {/* Sign In Link */}
                    <div className='mt-6 text-center'>
                        <p className='text-gray-600'>
                            Already have an account?{' '}
                            <a href='/login' className='text-purple-600 hover:text-purple-700 font-semibold'>Sign in</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}