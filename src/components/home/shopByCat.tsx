"use client"
import { CategoryI } from "@/types/category";
import CateCard from "../categories/cateCard";
import { SquareStack } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ShopByCat({ cate }: { cate: CategoryI[] }) {
    const t = useTranslations("HomeCate")
    return (
        <section className="container mx-auto px-6 py-12">

            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-1 lg:space-x-2">
                    <SquareStack className="text-primary size-4 lg:size-8" />
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                        {t("title")} <span className="text-primary">{t("sub")}</span>
                    </h2>
                </div>

                <button className="text-primary font-medium hover:underline">
                    {t("button")} →
                </button>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {cate.map((category) => (
                    <CateCard key={category._id} category={category} />
                ))}
            </div>
        </section>
    );
}

