"use client"
import { Check, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ProductsI } from "@/types/products"
import { Spinner } from "../ui/spinner"
import { Badge } from "../ui/badge"
type Props = {
    item: ProductsI
    onRemove?: (id: string) => void
    onAddToCart?: (id: string) => void
    isDeleting?: boolean
    isAdding?: boolean
    isInCart: boolean
}
export default function WishlistItem({ item, onRemove, onAddToCart, isDeleting, isAdding, isInCart }: Props) {
    return (
        <Card className="rounded-2xl border border-white/20 hover:shadow-md transition bg-background">
            <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <Image width={80} height={80} className="object-contain" src={item.imageCover} alt={item.title} />
                <div className="flex-1 space-y-2">
                    <h2 className="font-semibold text-lg">
                        {item.title}
                    </h2>
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {item.category.name}
                    </span>
                    <p className="text-primary font-bold text-lg">
                        {item.price} EGP
                    </p>
                </div>
                <div className="flex flex-col gap-3 justify-center">
                    <Button
                        onClick={() => onAddToCart?.(item._id)}
                        className="rounded-xl"
                    >
                        {isAdding ? (
                            <Spinner />
                        ) : (
                            <>
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                Add to Cart
                            </>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => onRemove?.(item._id)}
                        className="rounded-xl text-red-500 border-red-200 hover:bg-red-50"
                    >
                        {isDeleting ? (
                            <Spinner />
                        ) : (
                            <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
                            </>
                        )}
                    </Button>
                    {isInCart && (
                        <Badge className=" w-full bg-green-500">
                            In Cart <Check />
                        </Badge>
                    )}

                </div>
            </CardContent>
        </Card>
    )
}
