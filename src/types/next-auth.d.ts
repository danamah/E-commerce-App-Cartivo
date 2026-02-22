// import NextAuth, { DefaultSession } from "next-auth"
// import { JWT } from "next-auth/jwt"

// declare module "next-auth" {
//   interface User {
//     user: UserInfoI,
//     token:string
//   }
// }
// interface UserInfoI {
//     name: string,
//     email:string,
//     role:string
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     user:UserInfoI, 
//     idToken?: string
//   }
// }

import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"


interface UserInfoI {
  name: string
  email: string
  role: string
  phone?: string | null
}

declare module "next-auth" {
  interface Session {
    user: UserInfoI
  }

  interface User {
    user: UserInfoI
    token: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserInfoI
    token?: string
  }
}
