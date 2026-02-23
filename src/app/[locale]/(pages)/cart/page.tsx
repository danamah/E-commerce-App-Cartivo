"use client"
import { ClearUserCart, getLoggedUserCart } from "@/actions/cart.action"
import CartItem from "@/components/cart/cartItem"
import CartSkeleton from "@/components/cart/CartSkeleton"
import OrderSummary from "@/components/checkout/orderSummery"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cartContext } from "@/providers/cart-provider"
import { CartI, CartProductI } from "@/types/cart"
import { Eraser, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { toast } from "sonner"

export default function CartPage() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<CartProductI[] | []>([])
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const{handleCart} = useContext(cartContext)
  async function getUserCart() {
    try {
      setLoading(true)
      const data: CartI = await getLoggedUserCart()
      setProducts(data.data.products)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function emptyCart() {
    try {
      setLoading(true)
      const data = await ClearUserCart()
      console.log(data)
      if(data.message == "success"){
        toast.success("All Products Removed ☑️")
      }
      await handleCart()
      setProducts([])
    } catch (error) {
      console.log(error)
      toast.error("can not Empty Cart")
    }finally{
      setLoading(false)
    }
  }

  const cartItems = products || []
  const subtotal = cartItems.reduce(
    (acc: number, item: CartProductI) => acc + (item as CartProductI).price * (item as CartProductI).count,
    0
  )

  useEffect(() => {
    (async () => {
      await getUserCart()
    })()
  }, [])


  return (
    <>
      <Breadcrumb className="py-3 px-5 text-sm">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-lg font-medium" href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage className="text-lg font-medium">Shopping Bag 🛍️</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      {products.length !== 0 && <>
        <header className="mx-4 my-3 p-2 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 space-y-2">
              <ShoppingBag className="size-12 p-2 text-accent bg-linear-to-r from-[#7C3AED] to-[#A855F7] border border-white/20 rounded-md shadow" />
              <h1 className="text-3xl font-bold text-foreground">Shopping Bag</h1>
            </div>
            <p className="text-lg font-bold text-text-secondary">You have <span className="text-primary">{products.length}</span> in your Bag</p>
          </div>
          <Button onClick={emptyCart} className="text-md font-medium bg-linear-to-r from-[#7C3AED] to-[#A855F7] hover:bg-linear-to-l hover:from-[#A855F7] hover:to-[#7C3AED] transition-colors duration-200 border-white/20 ">
          {loading ? <Spinner/> : <> 
          Clear All Cart
          <Eraser /></>}
          </Button>
        </header>
      </>}
      <div className="grid lg:grid-cols-3 gap-10 p-4">
        <div className="lg:col-span-2 space-y-6">
          {loading ? <CartSkeleton /> : products.length === 0 ? (<>
            <div className="bg-accent h-full p-3 rounded-2xl border border-white/20 flex flex-col justify-center gap-3 items-center">
              <p className="text-xl font-bold text-text-secondary">Your cart is empty</p>
              <Button asChild className="bg-linear-to-r from-[#7C3AED] to-[#A855F7]">
                <Link
                  className="flex items-center space-x-1 text-accent text-md"
                  href={"/products"}
                >
                  Start Shoping now
                </Link>
              </Button>
            </div>
          </>
          ) : (
            products.map((prod) => (
              <CartItem setProducts={setProducts} key={prod._id} product={prod} />
            ))
          )}
        </div>
        <OrderSummary checkoutLoading={checkoutLoading} setCheckoutLoading={setCheckoutLoading} subtotal={subtotal} />
      </div>

    </>
  )
}
