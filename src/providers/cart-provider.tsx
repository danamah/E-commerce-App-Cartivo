"use client"
import { getLoggedUserCart } from '@/actions/cart.action'
import { CartI } from '@/types/cart'
import React, { createContext, useEffect, useState } from 'react'
interface CartContextI {
    numOfCartItems: number
    handleCart: () => void
    isLoading:boolean
}
export const cartContext = createContext<CartContextI>({
    numOfCartItems: 0,
    handleCart: () => { },
    isLoading:false
})
export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [numOfCartItems, setNoOfCartItem] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    async function handleCart() {
        try {
            setIsLoading(true)
            const data: CartI = await getLoggedUserCart()
            const total = data.data.products.reduce((accu, prod) => prod.count + accu, 0)
            setNoOfCartItem(total)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        const fetchCart = async () => {
            await handleCart()
        }
        fetchCart()
    }, [])
    return (
        <>
            <cartContext.Provider value={{ numOfCartItems, handleCart,isLoading }}>
                {children}
            </cartContext.Provider>
        </>
    )
}
