"use client";

import { CategoryI } from "@/types/category"
import { BrandI } from "@/types/brand"
import CategoryFilter from "./category-filter";
import BrandFilter from "./brands-filter";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function FiltersSidebar({ categories, brands, }: { categories: CategoryI[]; brands: BrandI[]; }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleClear() {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("category");
        params.delete("brand");
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    }
    return (
        <aside className="w-64 h-[85vh] sticky top-6 border rounded-2xl p-4 flex flex-col bg-oklch shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Filters</h2>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-600 hover:text-purple-700"
                    onClick={handleClear}
                >
                    Clear
                </Button>
            </div>
            {/* Scroll Area */}
            <div className="overflow-y-auto pr-2 space-y-6">
                <CategoryFilter categories={categories} />
                <BrandFilter brands={brands} />
            </div>

        </aside>
    );
}

