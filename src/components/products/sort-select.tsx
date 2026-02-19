"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect() {
    const router = useRouter();
    const params = useSearchParams();
    function handleSort(value: string) {
        const query = new URLSearchParams(params.toString());

        query.set("sort", value);
        query.set("page", "1"); // reset pagination

        router.push(`?${query.toString()}`);
    }
    return (
        <div className="flex items-center gap-2 justify-end my-2 pt-2 px-4">
            <span className="text-sm text-muted-foreground">
                Sort By:
            </span>

            <Select onValueChange={handleSort}>
                <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Newest" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="-createdAt">Newest</SelectItem>
                    <SelectItem value="createdAt">Oldest</SelectItem>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="-price">Price: High to Low</SelectItem>
                    <SelectItem value="-ratingsAverage">Highest Rated</SelectItem>
                    <SelectItem value="-sold">Best Selling</SelectItem>
                    <SelectItem value="title">Name: A-Z</SelectItem>
                    <SelectItem value="-title">Name: Z-A</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
