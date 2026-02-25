"use client"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { CategoryI } from "@/types/category"
import { BrandI } from "@/types/brand"
import CategoryFilter from "./category-filter"
import BrandFilter from "./brands-filter"
import { SlidersHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

export default function FiltersSheet({categories,brands,}: {categories: CategoryI[];brands: BrandI[];}) {
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
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                    Filters
                    <SlidersHorizontal size={18} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] sm:w-87.5 p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg">Filters</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                </div>
                <div className="overflow-y-auto space-y-6 pr-2">
                    <CategoryFilter categories={categories} />
                    <BrandFilter brands={brands} />
                </div>
            </SheetContent>
        </Sheet>

    )
}
