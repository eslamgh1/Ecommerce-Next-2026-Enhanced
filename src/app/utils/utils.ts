import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
   
     const cookie = await cookies()
     const sessionToken = cookie.get('next-auth.session-token')?.value;
     console.log("Session token found:", !!sessionToken);

     //decode differs JwtDecode
     const decodedToken = await decode({ token: sessionToken, secret: process.env.NEXTAUTH_SECRET || '' });
     console.log("Decoded token:", decodedToken ? "Token decoded successfully" : "Failed to decode token");
     
     const credentialToken = decodedToken?.credentialToken;
     console.log("Credential token found:", !!credentialToken);

    //  return sessionToken;
     return credentialToken
    
}