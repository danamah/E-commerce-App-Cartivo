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

export default function ProductDetailsActions({ product }: { product: ProductsI }) {
    const [count, setCount] = useState(1)
    const { handleCart } = useContext(cartContext)
    const { handleWishList } = useContext(wishListContext)
     const t = useTranslations("productDetails");
    async function handleAddToCart() {
        try {
            const res = await addToCart(product._id)
            if (res.status === "success") {
                await updateCartProductCount(product._id, count)
                toast.success("Added successfully ☑️")
                await handleCart()
            }
        } catch {
            toast.error("Error")
        }
    }
    async function handleAddToWishList() {
        try {
            const res = await addToWishList(product._id)
            if (res.status === "success") {
                toast.success("Added to wishlist ❤️")
                await handleWishList()
            }
        } catch {
            toast.error("Error")
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
                    <ShoppingCart size={18} /> {t("addBtn")}
                </Button>
                <Button className="col-span-12 md:col-span-6" onClick={handleAddToWishList}>
                    <Heart size={18} /> {t("wishBtn")}
                </Button>
            </div>
        </div>
    )
}
