"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import image1 from "../../../public/hero-bg/3d-illustration-smartphone-with-products-coming-out-screen-online-shopping-e-commerce-concept.jpg"
import image2 from "../../../public/hero-bg/arrangement-black-friday-shopping-carts-with-copy-space.jpg"
import image3 from "../../../public/hero-bg/computer-mouse-paper-bags-blue-background-top-view.jpg"
import { useTranslations } from "next-intl"
import { Button } from "../ui/button"
import Link from "next/link"


export default function CarouselHome() {
    const t = useTranslations("CarouselHome");
    const slides = [
        {
            image: image1,
            title: t("title1"),
            subtitle: t("subtitle1"),
            cta: t("cta1"),
            deals: t("deals1")
        },
        {
            image: image2,
            title: t("title2", { default: "" }),
            subtitle: t("subtitle2", { default: "" }),
            cta: t("cta2", { default: "" }),
            deals: t("deals2", { default: "" })
        },
        {
            image: image3,
            title: t("title3", { default: "" }),
            subtitle: t("subtitle3", { default: "" }),
            cta: t("cta3", { default: "" }),
            deals: t("deals3", { default: "" })
        },
    ];
    return (
        <>
            <div dir="ltr">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 4000,
                        }),
                    ]}
                    className="w-full"
                >
                    <CarouselContent>
                        {slides.map((slide, index) => (
                            <CarouselItem key={`slide-${index}`} className="relative h-[60vh] md:h-[70vh] lg:h-[80vh]">
                                <Image
                                    fill
                                    src={slide.image}
                                    alt={slide.title}
                                    className="object-cover brightness-90"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-purple-950/80 via-purple-800/60 to-transparent" />
                                <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white  px-6">
                                    <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl max-w-3xl">
                                        {slide.title}
                                    </h2>
                                    <p className="text-xl md:text-3xl mb-10 drop-shadow-lg max-w-2xl">
                                        {slide.subtitle}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <Button asChild size="lg" className="rounded-full px-10 text-lg bg-[#F59E0B] text-neutral-50 hover:bg-purple-400">
                                            <Link href="/products">{slide.cta}</Link>
                                        </Button>
                                        <Button asChild variant="outline" size="lg" className="rounded-full px-10 text-lg bg-primary border-white/20 shadow text-white hover:bg-white/20">
                                            <Link href="/deals">{slide.deals}</Link>
                                        </Button>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-8 bg-fuchsia-300/50 border-white/20 shadow text-white hover:bg-white/20" />
                    <CarouselNext className="right-8 bg-fuchsia-300/50 border-white/20 shadow text-white hover:bg-white/20" />
                </Carousel>
            </div>
        </>
    )
}
