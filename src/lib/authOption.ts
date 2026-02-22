import { signInUser } from "@/services/auth.services";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";


interface decodedTokenType{
    id:string,
    name:string,
    role:string
}

export const AuthOptions : NextAuthOptions = {
    pages:{
        signIn:"/login"
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {email:{},password:{}},
            authorize:async(credentials)=>{
                if(!credentials) return null;
                const response = await signInUser(credentials)
                console.log(response)
                if(response.message == "success"){
                    const decodedToken:decodedTokenType = jwtDecode(response.token)
                    // toast.success("logged in successfully")
                    return{
                        id:decodedToken.id,
                        user: response.user,
                        token: response.token
                    }
                }else{
                    // toast.error(response.message)
                    throw new Error (response.message || "invalid credentials")
                }
            }
        })
    ],
    callbacks:{
        jwt({token, user}){
            if(user){
                token.user = user.user;
                token.token = user.token;
            }
            return token
        },
        session({session, token}){
            if(session){
                session.user = token.user
                session.token = token.token as string;
            }
            return session
        }
    }
}