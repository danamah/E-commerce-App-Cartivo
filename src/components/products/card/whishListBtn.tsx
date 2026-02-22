"use client"
import { addToWishList } from '@/actions/wishList.action'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { wishListContext } from '@/providers/wishList-provider'
import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
export default function WhishListBtn({ prodId }: { prodId: string }) {
  const [isLoading, setIsLoading] = useState(false)
    const { data: session } = useSession()
    const{handleWishList} = useContext(wishListContext)
    async function handleAddWishList() {
        try {
            setIsLoading(true)
            await new Promise(res => setTimeout(res, 400))
            if (!session) {
                const wishList = JSON.parse(localStorage.getItem("wishList") || "[]")
                wishList.push(prodId)
                localStorage.setItem("wishList", JSON.stringify(wishList))
                toast.success("Added to wish list ✅")
                return
            }
            const response = await addToWishList(prodId)
            if (response.status === "success") {
                toast.success(response.message)
            }
            await handleWishList()
        } catch (error) {
            console.log(error)
            toast.error("Failed to add to wish list")
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <>
      <Button disabled={isLoading}
            onClick={handleAddWishList} className="p-2 bg-primary/70 rounded-full shadow">
        {isLoading? <Spinner/> : <Heart size={18} />}
      </Button>
    </>
  )
}
