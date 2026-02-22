"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "../ui/button"
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
    const [api, setApi] = React.useState<CarouselApi>()
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    // ✅ autoplay instance
    const autoplay = React.useRef(
        Autoplay({
            delay: 2500,
            stopOnInteraction: false,
        })
    )

    React.useEffect(() => {
        if (!api) return

        const onSelect = () => {
            setSelectedIndex(api.selectedScrollSnap())
        }

        api.on("select", onSelect)

        return () => {
            api.off("select", onSelect)
        }
    }, [api])

    // thumbnail click
    const handleThumbnailClick = (index: number) => {
        if (!api) return

        api.scrollTo(index)
        autoplay.current.stop() // ✅ stop autoplay after user action
    }



    if (!images || images.length === 0) {
        return (
            <div className="flex items-center justify-center h-96 bg-gray-100 rounded-xl">
                <p className="text-gray-400">No Images Available</p>
            </div>
        );
    }

    return (
        <>
            <div dir="ltr">
                {/* <Carousel
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
                </Carousel> */}
                <div dir="ltr" className="space-y-4">
                    {/* ✅ main carousel */}
                    <Carousel
                        setApi={setApi}
                        opts={{ loop: true }}
                        plugins={[autoplay.current]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {images.map((img, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative w-full h-100 rounded-xl overflow-hidden border">
                                        <Image
                                            src={img}
                                            alt={`${title}-${index}`}
                                            fill
                                            priority={index === 0}
                                            className="object-contain"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    {/* ✅ sub img */}
                    <div className="flex gap-3 overflow-x-auto pb-2 pt-4 px-4">
                        {images.map((img, index) => (
                            <Button
                                key={index}
                                onClick={() => handleThumbnailClick(index)}
                                className={`relative min-w-20 h-20 rounded-lg overflow-hidden border-2 transition
              ${selectedIndex === index
                                        ? "border-primary scale-105"
                                        : "border-transparent opacity-70 hover:opacity-100"
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${title}-thumb-${index}`}
                                    fill
                                    className="object-cover"
                                />
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
