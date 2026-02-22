"use client"

import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"
import Link from "next/link"

export default function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">

      <div className="bg-muted p-10 rounded-3xl mb-8">
        <Package className="w-14 h-14 text-muted-foreground" />
      </div>

      <h2 className="text-2xl font-bold mb-3">
        No orders yet
      </h2>

      <p className="text-muted-foreground max-w-md mb-8">
        When you place orders, they&apos;ll appear here so you can track them.
      </p>

      <Link href="/products">
        <Button className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg rounded-xl shadow-lg">
          Start Shopping
        </Button>
      </Link>

    </div>
  )
}
