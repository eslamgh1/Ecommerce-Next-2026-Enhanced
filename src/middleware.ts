import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// it will run on every request
export default async function middleware(req: NextRequest) {

    const JwtToken = await getToken({req})
    // console.log({JwtToken})

    if (JwtToken){
        return NextResponse.next() // if token exists, allow access
    }
  
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}login`) // if token doesn't exist, redirect to login
}

export const config = {
    matcher: ['/cart:path*']
}