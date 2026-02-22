"use server"
import { getUserToken } from "@/lib/auth";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface UpdateUserDataResponse {
  message: string
  user?: {
    name: string
    email: string
    phone: string
  }
}


export async function updateLoggedUserPassword(data: { currentPassword: string; password: string; rePassword:string }) {
  const token = await getUserToken()
  const response = await fetch(`${API_URL}/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "token": token as string
    },
    body: JSON.stringify(data),
  });
  return await response.json() ;
}

export async function updateLoggedUserData(data: { name: string; email: string; phone:string }):Promise<UpdateUserDataResponse> {
  const token = await getUserToken()
  const response = await fetch(`${API_URL}/users/updateMe/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "token": token as string
    },
    body: JSON.stringify(data),
  });
  return await response.json() as UpdateUserDataResponse ;
}

export async function addAdress(data: { name: string; details: string; phone:string; city:string}) {
  const token = await getUserToken()
  const response = await fetch(`${API_URL}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token": token as string
    },
    body: JSON.stringify(data),
  });
  return await response.json() ;
}

export async function removeAddress(addressId:string) {
    const token = await getUserToken()
    try {
        const response = await fetch(`${API_URL}/addresses/${addressId}`, {
            method:"DELETE",
            headers: {
                "content-Type": "application/json",
                "token": token as string
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching remove Adress:', error);
        throw error;
    }
}
export async function getSpecificAddress(addressId:string) {
    const token = await getUserToken()
    try {
        const response = await fetch(`${API_URL}/addresses/${addressId}`, {
            method:"GET",
            headers: {
                "content-Type": "application/json",
                "token": token as string
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Specific Adress:', error);
        throw error;
    }
}

export async function getLoggedUserAdresses() {
  const token = await getUserToken();
  if (!token) {
    console.error("No token found");
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/addresses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Failed to fetch addresses:", response.status);
      return [];
    }
    const data = await response.json();
    if (Array.isArray(data?.data)) {
      return data.data;
    }
    console.warn("Addresses data is not an array:", data);
    return [];
  } catch (error) {
    console.error("Error fetching user Addresses:", error);
    return [];
  }
}