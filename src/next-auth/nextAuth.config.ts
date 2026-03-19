import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode"
// import { compare } from "bcrypt"
// import { getUserToken } from "./tokenActions"
// import { getUserByEmail } from "../_services/auth.service"

export const nextAuthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-change-in-production",
    providers: [
        //Credentials Provider is used to create custom login page  //google provider  //github provider
        //CredentialsProvider({})
        CredentialsProvider({
            name: "Login Fresh Cart",

            // authorize is a Fn Login
            authorize: async function (credentials, req) {
                // console.log("credentials", credentials )
                const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(credentials)  //convert object to JSON string. 
                })
                const finalRes = await res.json()
                console.log({ finalRes })

                if (finalRes.message == "success") {

                    const decodedObject: { id: string } = jwtDecode(finalRes.token)
                    console.log({ decodedObject })

                    return {
                        id: decodedObject.id,
                        credentialToken: finalRes.token,
                        name: finalRes.user.name,
                        email: finalRes.user.email,
                        role: finalRes.user.role || 'user'
                    }
                }

                throw new Error(finalRes.message || "Invalid credentials email or password is incorrect")
            },

            // field in login page
            credentials: {
                email: {},
                password: {}
            },


        })
    ],

    pages: {
        signIn: "/login"
    },

    callbacks: {
        // JWT : Json web token
        // 3 ways to get user session: 1-useSession 2-getServerSession 3-api/auth/session
        //!!!!######################Important !
        // user in call back refere to return of authorize function not our user
        // token in call back refere to object to store data in server
        //!!!!!######################Important !

        //params or any parameter is object contain user and token
        //params.token is an object to store data in server
        //params.user is authnticated object from authorize function
        // jwt(params) run after successfull login
        async jwt(params) {

            if (params.user) {
                params.token.credentialToken = params.user?.credentialToken
                params.token.userId = params.user?.id
            }

            // console.log("params after mutation", params)
            // we need params.token to store data in server such as credentialToken and userId
            return params.token
        },

        // data at client
        // session(params) run after successfull login
        //3=ways to get user session: 1-useSession 2-getServerSession 3-api/auth/session
        async session({ session, token }: any) {
            // console.log("session params ", token)

            if (token && token.userId) {
                session.user.id = token.userId
            }

            return session
        }

    },

    session: {
        maxAge: 60 * 60 * 24 * 3000 // 30 days
    }
}

