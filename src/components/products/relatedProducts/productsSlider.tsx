"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "../card/product-card";
import { ProductsI } from "@/types/products";
import { div } from "framer-motion/client";

export default function ProductsSlider({ products }: { products: ProductsI[] }) {
    return (
        <>
            <div dir="ltr" className="lg:px-3">
                <Carousel
                    opts={{
                        align: "start",
                        dragFree: true,
                        containScroll: "trimSnaps"
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {products.map((product) => (
                            <CarouselItem
                                key={product._id}
                                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
                            >
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="ms-2 text-primary bg-amber-400/40" />
                    <CarouselNext className="ms-2 text-primary bg-amber-400/40" />
                </Carousel>
            </div>
        </>
    );
}
