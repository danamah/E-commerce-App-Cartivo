"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"
import { WishListI } from "@/types/wishList"
import WishlistItem from "@/components/wishList/wishtListItem"
import { useContext, useEffect, useState } from "react"
import { getLoggedUserWishList } from "@/actions/wishList.action"
import { ProductsI } from "@/types/products"
import WishListSkeleton from "@/components/wishList/wishListSkeleton"
import { removeProductFromWishList } from "@/actions/wishList.action"
import { toast } from "sonner"
import { addToCart } from "@/actions/cart.action"
import { getLoggedUserCart } from "@/actions/cart.action"
import { CartProductI } from "@/types/cart"
import { cartContext } from "@/providers/cart-provider"
import { wishListContext } from "@/providers/wishList-provider"
import { useTranslations } from "next-intl"

export default function WishlistPage() {
  const [loading, setLoading] = useState(true)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)
  const [loadingAddId, setLoadingAddId] = useState<string | null>(null)
  const [products, setProducts] = useState<ProductsI[]>([])
  const [cartIds, setCartIds] = useState<string[]>([])
  const {handleCart} = useContext(cartContext)
  const {handleWishList} = useContext(wishListContext)
    const t = useTranslations("wishLists");
  async function getUserWishList() {
    try {
      setLoading(true)
      const data: WishListI = await getLoggedUserWishList()
      setProducts(data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  async function handleRemove(id: string) {
    try {
      setLoadingDeleteId(id)
      const res = await removeProductFromWishList(id)
      if (res.status === "success") {
        setProducts(prev => prev.filter(p => p._id !== id))
        toast.success("Removed successfully")
      }
      await handleWishList()
    } catch (error) {
      console.log(error)
      toast.error("Error removing product")
    } finally {
      setLoadingDeleteId(null)
    }
  }
  async function handleAddToCart(id: string) {
    try {
      setLoadingAddId(id)
      const res = await addToCart(id)
      if (res.status === "success") {
        toast.success("Added to cart")
      }
      setCartIds(prev => [...prev, id])
      await handleCart()
    } catch (error) {
      toast.error("Failed to add to cart")
    } finally {
      setLoadingAddId(null)
    }
  }
  async function getUserCart() {
    try {
      const data = await getLoggedUserCart()
      const ids = data.data.products.map((p: CartProductI) => p.product._id)
      setCartIds(ids)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      await Promise.all([
        getUserWishList(),
        getUserCart()
      ])
    })()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-primary/10 p-3 rounded-xl">
          <Heart className="text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">
            {products.length} {t("savedItems")}
          </p>
        </div>
      </div>
      {loading ? <WishListSkeleton /> : products.length === 0 ? (
        <div className="bg-muted rounded-2xl space-y-4 p-14 text-center">
          <p className="text-muted-foreground">
            {t("subTitle")}
          </p>
          <Button asChild className="bg-linear-to-r from-[#7C3AED] to-[#A855F7]">
            <Link
              className="flex items-center space-x-1 text-accent text-md"
              href={"/products"}
            >
              {t("StartShopping")}
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {products.map((prod) => (
            <WishlistItem
              key={prod._id}
              item={prod}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
              isDeleting={loadingDeleteId === prod._id}
              isAdding={loadingAddId === prod._id}
              isInCart={cartIds.includes(prod._id)} 
            />
          ))}

        </div>
      )}

    </div>
  )
}
