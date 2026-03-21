import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
   
     const cookie = await cookies()
     
     // Try different cookie names for development vs production
     const sessionToken = cookie.get('next-auth.session-token')?.value || 
                         cookie.get('__Secure-next-auth.session-token')?.value;
     
     console.log("Session token found:", !!sessionToken);
     console.log("Cookie names checked:", ['next-auth.session-token', '__Secure-next-auth.session-token']);

     if (!sessionToken) {
         console.log("No session token found in cookies");
         return null;
     }

     //decode differs JwtDecode
     const decodedToken = await decode({ 
         token: sessionToken, 
         secret: process.env.NEXTAUTH_SECRET || '' 
     });
     
     console.log("Decoded token:", decodedToken ? "Token decoded successfully" : "Failed to decode token");
     
     const credentialToken = decodedToken?.credentialToken;
     console.log("Credential token found:", !!credentialToken);

    //  return sessionToken;
     return credentialToken
    
}