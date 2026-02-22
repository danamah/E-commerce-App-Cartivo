"use server"
import { getUserToken } from "@/lib/auth";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function addToWishList(productId: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not autherized to do this action")
    }
    try {
        const response = await fetch(`${API_URL}/wishlist`, {
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
        console.error('Error fetching add to wishList:', error);
        throw error;
    }
}

export async function getLoggedUserWishList() {
    const token = await getUserToken()
    try {
        const response = await fetch(`${API_URL}/wishlist`, {
            headers: {
                "content-Type": "application/json",
                "token": token as string
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching logged User Wish List:', error);
        throw error;
    }
}

export async function removeProductFromWishList(productId:string) {
    const token = await getUserToken()
    try {
        const response = await fetch(`${API_URL}/wishlist/${productId}`, {
            method:"DELETE",
            headers: {
                "content-Type": "application/json",
                "token": token as string
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching remove from wish List:', error);
        throw error;
    }
}