"use client"
import { removeSpecificCartItem, updateCartProductCount } from '@/actions/cart.action'
import { cartContext } from '@/providers/cart-provider'
import { CartProductI } from '@/types/cart'
import { Check, Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import Link from 'next/link'
import { Badge } from '../ui/badge'

export default function CartItem({ product, setProducts }: { product: CartProductI, setProducts: (products: CartProductI[]) => void }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingPlus, setIsLoadingPlus] = useState(false)
    const [isLoadingMinus, setIsLoadingMinus] = useState(false)
    const { handleCart } = useContext(cartContext)

    async function deleteProduct(id: string) {
        try {
            setIsLoading(true)
            const data = await removeSpecificCartItem(id)
            console.log(data)
            if (data.status == "success") {
                toast.success("Product Remove Successfully ☑️")
            }
            setProducts(data.data.products)
            await handleCart()
        } catch (error) {
            console.log(error)
            toast.error("Error Occurred")
        } finally {
            setIsLoading(false)
        }
    }
    async function updateProductCount(id: string, newCount: number, type: "plus" | "minus") {
        try {
            if (type === "plus") setIsLoadingPlus(true)
            if (type === "minus") setIsLoadingMinus(true)
            const response = await updateCartProductCount(id, newCount)
            console.log(response)
            toast.success("Product Quantity updated Successfully ☑️")
            setProducts(response.data.products)
            await handleCart()
        } catch (error) {
            console.log(error)
            toast.error("Error Occurred")
        } finally {
            if (type === "plus") setIsLoadingPlus(false)
            if (type === "minus") setIsLoadingMinus(false)
        }
    }
    return (
        <div className="bg-background border rounded-2xl p-6 flex flex-col md:flex-row gap-6 ">
            <Image
                className='object-contain'
                src={product.product.imageCover}
                height={80}
                width={80}
                alt={product.product.title}

            />
            <div className="flex-1 space-y-2">
                <h2 className="font-semibold text-lg">
                    {product.product.title}
                </h2>
                <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {product.product.category.name}
                </span>
                <p className="text-text-main font-bold text-lg my-2">
                    {product.price} EGP
                </p>
                <div className="flex items-center gap-4 mt-4">
                    <Button onClick={() => {
                        updateProductCount(product.product._id, product.count - 1, "minus")
                    }} className="p-2 border rounded-lg hover:bg-muted hover:text-black">
                        {isLoadingMinus ? <Spinner /> : <Minus size={16} />}
                    </Button>
                    <span>{product.count}</span>
                    <Button onClick={() => {
                        updateProductCount(product.product._id, product.count + 1, "plus")
                    }} className="p-2 border rounded-lg hover:bg-muted hover:text-black">
                        {isLoadingPlus ? <Spinner /> : <Plus size={16} />}
                    </Button>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end">
                <Button onClick={() => {
                    deleteProduct(product.product._id)
                }} className="p-2 text-red-400 hover:bg-red-50 hover:text-red-700 rounded-lg">
                    {isLoading ? <Spinner /> : <Trash2 size={18} />}
                </Button>
                <Badge asChild >
                    <Link className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" href={`/products/${product.product._id}`}>
                        in stock <Check data-icon="inline-end"/>
                    </Link>
                </Badge>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-bold text-lg">
                        {product.price * product.count} EGP
                    </p>
                </div>
            </div>
        </div>
    )
}
