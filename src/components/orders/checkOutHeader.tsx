"use client"
import { Receipt } from "lucide-react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { useTranslations } from "next-intl";

export default function CheckoutHeader() {
    const t = useTranslations("checkOut");
    return (
        <>
            <Breadcrumb className="py-3 pt-0 px-5 text-sm">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-sm font-medium" href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-sm font-medium" href="/products">products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-sm font-medium" href="/cart">Shopping cart</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbPage className="text-sm font-medium">Check out ☑️</BreadcrumbPage>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <Receipt className="size-12 text-accent border border-white/20 bg-linear-to-r from-[#7C3AED] to-[#A855F7] p-2 rounded-lg shadow" />
                    <h1 className="text-2xl md:text-3xl font-bold">{t("CompleteYourOrder")}</h1>
                </div>
                <p className="font-medium text-md text-ring"></p>
                <Link href="/cart" className="text-primary hover:underline flex items-center gap-2">
                    {t("BackToCart")}
                </Link>
            </div>
        </>
    );
}