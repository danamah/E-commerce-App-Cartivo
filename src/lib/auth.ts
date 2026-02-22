import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    // const decodedToken = (await cookies()).get("next-auth.session-token")?.value
    const cookieStore = await cookies();
    const decodedToken =
        cookieStore.get("__Secure-next-auth.session-token")?.value ||
        cookieStore.get("next-auth.session-token")?.value;
    const token = await decode({ token: decodedToken, secret: process.env.AUTH_SECRET! })
    return token?.token
}

// import { getServerSession } from "next-auth";
// import { AuthOptions } from "@/lib/authOption"; 

// export async function getUserToken() {
//   const session = await getServerSession(AuthOptions);
//   return (session)?.token;
// }






