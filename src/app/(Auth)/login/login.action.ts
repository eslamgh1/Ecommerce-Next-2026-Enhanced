'use server'

import { cookies } from "next/headers"
import { LoginFormType } from "./login.type"


export async function handleLogin(data: LoginFormType) {
    try {
        //Calling Api by fetch
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)  //convert object to JSON string. 
        })

        const finalRes = await res.json()  // convert string to object
        console.log({ finalRes })

        const cookie = await cookies()
        cookie.set("user-token", finalRes.token, {
            httpOnly: true,
            // secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 365 // default by seconds (1 year)
        })


        if (finalRes.message === 'success') {
            return true

        } else {
            return finalRes.message
        }

    } catch (error) {
        console.log({ error })
    }
}