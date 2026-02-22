"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { toast } from "sonner"
import { addToWishList } from "@/actions/wishList.action"

export default function WishListSync() {
    const { data: session } = useSession()

    useEffect(() => {
        if (!session) return
        const wishList = JSON.parse(localStorage.getItem("wishList") || "[]")
        if (wishList.length === 0) return
        async function syncWishList() {
            for (const productId of wishList) {
                await addToWishList(productId)
            }
            localStorage.removeItem("wishList")
            console.log("Guest wishList synced ✅")
            toast.success("Guest wishList synced ✅")
        }
        syncWishList()
    }, [session])

    return null
}