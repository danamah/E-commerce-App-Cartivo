"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Receipt } from "lucide-react"

export default function OrderSummary({ subtotal }: { subtotal: number }) {
    const { data: session } = useSession()

    return (
        <div className="bg-muted rounded-2xl p-6 h-fit space-y-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="text-xl font-bold">{subtotal} EGP</span>
            </div>
            <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-primary">
                    Calculated at checkout
                </span>
            </div>
            <hr />
            {session ? (
                <Button asChild className="bg-linear-to-r from-[#7C3AED] to-[#A855F7] w-full hover:bg-linear-to-r hover:from-[#8a4ef2] hover:to-[#aa66e9] transition-colors duration-200">
                    <Link href="/checkout" className="btn">
                        Proceed to Checkout
                        <Receipt />
                    </Link>
                </Button>
            ) : (
                <Button asChild className="bg-linear-to-r from-[#7C3AED] to-[#A855F7] w-full hover:bg-linear-to-r hover:from-[#8a4ef2] hover:to-[#aa66e9] transition-colors duration-200">
                    <Link href="/login" className="btn">
                        Login to Checkout
                    </Link>
                </Button>
            )}
        </div>
    )
}
