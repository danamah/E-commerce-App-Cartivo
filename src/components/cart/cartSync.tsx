"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { addToCart } from "@/actions/cart.action"
import { toast } from "sonner"

export default function CartSync() {
    const { data: session } = useSession()

    useEffect(() => {
        if (!session) return
        const cart = JSON.parse(localStorage.getItem("cart") || "[]")
        if (cart.length === 0) return
        async function syncCart() {
            for (const productId of cart) {
                await addToCart(productId)
            }
            localStorage.removeItem("cart")
            console.log("Guest cart synced ✅")
            toast.success("Guest cart synced ✅")
        }
        syncCart()
    }, [session])

    return null
}
