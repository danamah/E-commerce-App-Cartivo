"use server"
import { getUserToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function addToCart(productId: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not autherized to do this action")
    }
    try {
        const response = await fetch(`${API_URL}/cart`, {
            method: "POST",
            body: JSON.stringify({ productId: productId }),
            headers: {
                "content-Type": "application/json",
                "token": token as string
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching add To Cart:', error);
        throw error;
    }
}
export async function getLoggedUserCart() {
    const token = await getUserToken()
    // if (!token) {
    //     throw new Error("you are not autherized to do this action")
    // }
    try {
        const response = await fetch(`${API_URL}/cart`, {
            headers: {
                "content-Type": "application/json",
                "token": token as string
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching add To Cart:', error);
        throw error;
    }
}
export async function removeSpecificCartItem(productId:string) {
    const token = await getUserToken()
    try {
        const response = await fetch(`${API_URL}/cart/${productId}`, {
            method:"DELETE",
            headers: {
                "content-Type": "application/json",
                "token": token as string
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching remove from Cart:', error);
        throw error;
    }
}
export async function updateCartProductCount(productId:string,newCount:number) {
    const token = await getUserToken()
    try {
        const response = await fetch(`${API_URL}/cart/${productId}`, {
            method:"PUT",
            body:JSON.stringify({count:newCount}),
            headers: {
                "content-Type": "application/json",
                "token": token as string
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching update cart Count:', error);
        throw error;
    }
}

export async function ClearUserCart() {
    const token = await getUserToken()
    try {
        const response = await fetch(`${API_URL}/cart`, {
            method:"DELETE",
            headers: {
                "content-Type": "application/json",
                "token": token as string
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching remove from Cart:', error);
        throw error;
    }
}