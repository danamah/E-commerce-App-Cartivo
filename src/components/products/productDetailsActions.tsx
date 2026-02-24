"use client"

import { useState, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react"
import { cartContext } from "@/providers/cart-provider"
import { wishListContext } from "@/providers/wishList-provider"
import { addToCart, updateCartProductCount } from "@/actions/cart.action"
import { addToWishList } from "@/actions/wishList.action"
import { toast } from "sonner"
import { ProductsI } from "@/types/products"
import { useTranslations } from "next-intl"
import { Spinner } from "../ui/spinner"
import { useSession } from "next-auth/react"

export default function ProductDetailsActions({ product }: { product: ProductsI }) {
    const [count, setCount] = useState(1)
    const { handleCart } = useContext(cartContext)
    const { handleWishList } = useContext(wishListContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isWishLoading, setIsWishLoading] = useState(false)
    const { data: session } = useSession()
    const t = useTranslations("productDetails");
    async function handleAddToCart() {
        try {
            setIsLoading(true)
            await new Promise(res => setTimeout(res, 400))
            if (!session) {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]")
                cart.push(product._id)
                localStorage.setItem("cart", JSON.stringify(cart))
                toast.success("Added to guest cart ✅")
                return
            }
            const res = await addToCart(product._id)
            if (res.status === "success") {
                await updateCartProductCount(product._id, count)
                toast.success("Added successfully ☑️")
                await handleCart()
            }
        } catch {
            toast.error("Error")
        } finally {
            setIsLoading(false)
        }
    }
    async function handleAddToWishList() {
        try {
            setIsWishLoading(true)
            await new Promise(res => setTimeout(res, 400))
            if (!session) {
                const wishList = JSON.parse(localStorage.getItem("wishList") || "[]")
                wishList.push(product._id)
                localStorage.setItem("wishList", JSON.stringify(wishList))
                toast.success("Added to wish list ✅")
                return
            }
            const res = await addToWishList(product._id)
            if (res.status === "success") {
                toast.success("Added to wishlist ❤️")
                await handleWishList()
            }
        } catch {
            toast.error("Error")
        } finally {
            setIsWishLoading(false)
        }
    }
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button onClick={() => setCount(prev => Math.max(1, prev - 1))}>
                    <Minus size={16} />
                </Button>
                <span>{count}</span>
                <Button onClick={() => setCount(prev => prev + 1)}>
                    <Plus size={16} />
                </Button>
            </div>
            <div className="text-xl font-bold text-muted-foreground">
                {t("total")}: {product.price * count} EGP
            </div>
            <div className="grid grid-cols-12 gap-2">
                <Button className="col-span-12 md:col-span-6" onClick={handleAddToCart}>
                    {isLoading ? <Spinner /> : <>
                        <ShoppingCart size={18} /> {t("addBtn")}
                    </>}
                </Button>
                <Button className="col-span-12 md:col-span-6" onClick={handleAddToWishList}>
                    {isWishLoading ? <Spinner /> : <><Heart size={18} /> {t("wishBtn")}</>}
                </Button>
            </div>
        </div>
    )
}
