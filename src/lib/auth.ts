import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

// export async function getUserToken() {
//     // const decodedToken = (await cookies()).get("next-auth.session-token")?.value
//     const cookieStore = await cookies();
//     const decodedToken =
//         cookieStore.get("__Secure-next-auth.session-token")?.value ||
//         cookieStore.get("next-auth.session-token")?.value;
//     const token = await decode({ token: decodedToken, secret: process.env.AUTH_SECRET! })
//     return token?.token
// }

import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/authOption"; 

export async function getUserToken() {
  const session = await getServerSession(AuthOptions);
  return (session)?.token;
}





// import { getToken } from "next-auth/jwt";

// export async function getUserToken() {
//   const token = await getToken({
//     req: {
//       headers: Object.fromEntries(
//         (await import("next/headers")).headers()
//       )
//     } as any,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   return token?.token;
// }


