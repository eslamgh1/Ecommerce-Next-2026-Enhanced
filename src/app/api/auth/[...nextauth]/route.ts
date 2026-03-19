import { NextResponse } from "next/server";
import NextAuth from "next-auth"
import { nextAuthOptions } from "_/next-auth/nextAuth.config";

const nextHandler = NextAuth(nextAuthOptions)

export {nextHandler as  GET,  nextHandler as POST}

// [...nextauth] is a dynamic segment that captures the rest of the path after /api/auth.

//============================================
//  Route handlers
// GET, POST, PUT, DELETE
//============================================
//1- GET API
// export function GET(){
//     return NextResponse.json({
//         message:"Hello World",
//         data: [
//             {
//                 id:1,
//                 name:"John Doe"
//             },
//             {
//                 id:2,
//                 name:"Jane Doe"
//             }
//         ]
//     })
// }


