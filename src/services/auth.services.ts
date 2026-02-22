
import { logInSchemaType, registerSchemaType } from "@/lib/validationSchema/auth.schema";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function signUpUser(formdata:registerSchemaType){
    const response = await fetch(`${API_URL}/auth/signup`,{
        method:"POST",
        body:JSON.stringify(formdata),
        headers: {
            "Content-Type" : "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function signInUser(formdata:logInSchemaType) {
    const response = await fetch(`${API_URL}/auth/signin`,
        {
            method:"POST",
            body:JSON.stringify(formdata),
            headers:{
                "Content-Type":"application/json"
            }
        }
    )
    const data = await response.json()
    return data
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_URL}/auth/forgotPasswords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return await response.json();
}

export async function verifyResetCode(data: { email: string; resetCode: string }) {
  const response = await fetch(`${API_URL}/auth/verifyResetCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function resetPassword(data: { email: string; newPassword: string }) {
  const response = await fetch(`${API_URL}/auth/resetPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

