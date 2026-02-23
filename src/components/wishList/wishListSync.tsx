"use client"

import { useSession } from "next-auth/react"
import { useContext, useEffect } from "react"
import { toast } from "sonner"
import { addToWishList } from "@/actions/wishList.action"
import { wishListContext } from "@/providers/wishList-provider"

export default function WishListSync() {
    const { data: session } = useSession()
    const { handleWishList } = useContext(wishListContext)
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
        handleWishList()
    }, [session])

    return null
}