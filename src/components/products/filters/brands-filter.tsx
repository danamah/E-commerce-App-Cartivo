"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BrandI } from "@/types/brand"

export default function BrandFilter({ brands }: { brands: BrandI[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedBrand = searchParams.get("brand");
    function handleChange(brandId: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("brand", brandId);
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    }
    return (
        <div>
            <h3 className="font-semibold mb-3">Brand</h3>
            {brands.map((brand) => (
                // <label key={brand._id} className="flex gap-2 mb-2">
                //     <input
                //         type="radio"
                //         checked={selectedBrand === brand._id}
                //         onChange={() => handleChange(brand._id)}
                //     />
                //     {brand.name}
                // </label>
                <>
                    <label
                        className={`flex items-center my-2 justify-between px-3 py-2 rounded-lg cursor-pointer border transition${selectedBrand === brand._id
                                ? "bg-purple-100 border-purple-300 text-purple-700"
                                : "hover:bg-gray-50"}`}
                    >
                        <span>{brand.name}</span>
                        <input
                            type="radio"
                            className="hidden"
                            checked={selectedBrand === brand._id}
                            onChange={() => handleChange(brand._id)}
                        />
                    </label>

                </>
            ))}
        </div>
    );
}
