"use server";

import { getUserToken } from "@/lib/auth";
import { Order } from "@/types/allOrders";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

interface CreateOrderResponse {
  status: string;
  message?: string;
  data?: {
    _id: string;
  };
}

export interface OnlineCheckoutResponse {
  status: string;
  session?: {
    url: string;
    cancel_url?: string;
    success_url?: string;
  };
  message?: string;
}

export async function createCashOrder(cartId: string, shippingAddress: ShippingAddress) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("sign in is not allowed");
  }
  const response = await fetch(`${API_URL}/orders/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({ shippingAddress }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "request failed");
  }
  const result: CreateOrderResponse = await response.json();
  return result;
}

export async function checkOutOnlineSession(cartId: string, shippingAddress: ShippingAddress) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("sign in is not allowed");
  }
  const response = await fetch(`${API_URL}/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({ shippingAddress }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "request failed");
  }
  const result: OnlineCheckoutResponse = await response.json();
  return result;
}

export async function getUserOrders(): Promise<Order[]> {
  const token = await getUserToken();

  if (!token) {
    console.error("No token found - user not authenticated");
    return [];
  }
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Failed to fetch orders:", response.status);
      return [];
    }
    const data = await response.json();
    if (Array.isArray(data?.data)) {
      return data.data;
    }
    console.warn("Orders data is not an array:", data);
    return [];
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}