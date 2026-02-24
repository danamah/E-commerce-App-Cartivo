"use client"

import { ProductsI } from "@/types/products"
import Image from "next/image"
import { Eye, Repeat, Star } from "lucide-react"
import Link from "next/link"
import CardButton from "./cardButton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import WhishListBtn from "./whishListBtn"

export default function ProductCard({ product, }: { product: ProductsI }) {
  const hasDiscount =
    product.priceAfterDiscount &&
    product.priceAfterDiscount < product.price
    const discountPercentage = hasDiscount
    ? Math.round(
      ((product.price - product.priceAfterDiscount!) /
        product.price) *
      100
    )
    : 0

  return (
    <div className="rounded-xl border border-border bg-card p-2 hover:shadow-lg transition">
      <div className="relative">
        {hasDiscount && (
          <Badge
            className="absolute left-2 top-2 bg-red-500 hover:bg-red-600 text-white rounded-lg px-2 py-1"
          >
            -{discountPercentage}%
          </Badge>
        )}
        <Image
          src={product.imageCover}
          alt={product.title}
          width={300}
          height={300}
          className="rounded-lg object-cover"
        />
        <div className="absolute right-2 top-2 flex flex-col gap-2">
          <WhishListBtn prodId={product._id} />
          <Button
            size="icon"
            className="bg-primary/70 hover:bg-primary rounded-full"
          >
            <Repeat size={18} />
          </Button>
          <Link href={`/products/${product._id}`}>
            <Button
              size="icon"
              className="bg-primary/70 hover:bg-primary rounded-full"
            >
              <Eye size={18} />
            </Button>
          </Link>
        </div>
      </div>
      <footer className="flex flex-col justify-end mt-auto">
        <p className="text-sm text-muted-foreground mt-3">
          {product.category.name}
        </p>
        <h3 className="font-semibold text-lg">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mt-2">
          <Star
            className="fill-yellow-400 text-yellow-400"
            size={16}
          />
          <span>{product.ratingsAverage}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-muted-foreground line-through text-sm">
                  {product.price} EGP
                </span>
                <span className="font-bold text-xl text-primary">
                  {product.priceAfterDiscount} EGP
                </span>
              </>
            ) : (
              <span className="font-bold text-xl">
                {product.price} EGP
              </span>
            )}
          </div>
          <CardButton prodId={product._id} />
        </div>
      </footer>
    </div>
  )
}