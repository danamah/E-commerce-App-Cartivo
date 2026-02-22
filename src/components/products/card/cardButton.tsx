"use client"
import { addToCart } from "@/actions/cart.action"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import { useContext, useState } from "react"
import { toast } from "sonner"
import { Button } from "../../ui/button"
import { Spinner } from "../../ui/spinner"
import { cartContext } from "@/providers/cart-provider"
export default function CardButton({ prodId }: { prodId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const { data: session } = useSession()
    const{handleCart} = useContext(cartContext)
    async function handleAdd() {
        try {
            setIsLoading(true)
            await new Promise(res => setTimeout(res, 400))
            if (!session) {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]")
                cart.push(prodId)
                localStorage.setItem("cart", JSON.stringify(cart))
                toast.success("Added to guest cart ✅")
                return
            }
            const response = await addToCart(prodId)
            if (response.status === "success") {
                toast.success(response.message)
            }
            await handleCart()
        } catch (error) {
            console.log(error)
            toast.error("Failed to add product")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button disabled={isLoading}
            onClick={handleAdd}
            className="bg-primary size-10 text-primary-foreground rounded-full hover:scale-105 transition"
        >
            {isLoading ? <Spinner /> : <Plus className="size-4" />}
        </Button>
    )
}
