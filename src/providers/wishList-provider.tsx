"use client"
import { getLoggedUserWishList } from '@/actions/wishList.action'
import { WishListI } from '@/types/wishList'
import React, { createContext, useEffect, useState } from 'react'
interface WishListContextI {
    numOfWishListItems: number
    handleWishList: () => void
    isLoadingWish: boolean
}
export const wishListContext = createContext<WishListContextI>({
    numOfWishListItems: 0,
    handleWishList: () => { },
    isLoadingWish: false
})
export default function WishListContextProvider({ children }: { children: React.ReactNode }) {
    const [numOfWishListItems, setNumOfWishListItem] = useState(0)
    const [isLoadingWish, setIsLoadingWish] = useState(false)
    async function handleWishList(){
        try {
            setIsLoadingWish(true)
            const res:WishListI = await getLoggedUserWishList()
            setNumOfWishListItem(res.count || 0)
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoadingWish(false)
        }
    }

    useEffect(() => {
            const fetchWishList = async () => {
                await handleWishList()
            }
            fetchWishList()
        }, [])
    return (
        <>
           <wishListContext.Provider value={{numOfWishListItems, handleWishList,isLoadingWish}}>
            {children}
           </wishListContext.Provider>
        </>
    )
}
