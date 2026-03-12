import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    credentialToken: string,
    name: string,
    email: string,
    role: string

  }

  interface Session {
    user: {
      /** The user's postal address. */
      address: User.user
    }
  }
}