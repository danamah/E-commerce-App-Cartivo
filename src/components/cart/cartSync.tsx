"use client"

import { useSession } from "next-auth/react"
import { useContext, useEffect } from "react"
import { addToCart } from "@/actions/cart.action"
import { toast } from "sonner"
import { cartContext } from "@/providers/cart-provider"

export default function CartSync() {
    const { data: session } = useSession()
    const {handleCart } = useContext(cartContext)
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
            handleCart()
        }
        syncCart()
        handleCart()
    }, [session])

    return null
}
