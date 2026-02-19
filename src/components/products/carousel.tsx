"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
interface ProductCarouselProps {
    images: string[]
    title: string
}
// ~OR
// type Props = {
//   images: string[]
//   title: string
// }
// &  Use interface for component props and object shapes
// &  Use type for unions and more complex types
export default function ProductCarousel({ images = [], title }: ProductCarouselProps) {
    if (!images || images.length === 0) {
        return (
            <div className="flex items-center justify-center h-96 bg-gray-100 rounded-xl">
                <p className="text-gray-400">No Images Available</p>
            </div>
        );
    }

    return (
        <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
        >
            <CarouselContent>
                {images.map((img, index) => (
                    <CarouselItem key={index}>
                        <div className="relative w-full h-[400px]">
                            <Image
                                fill
                                src={img}
                                alt={title}
                                className="object-contain"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
