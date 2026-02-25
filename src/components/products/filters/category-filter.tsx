"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CategoryI } from "@/types/category"
export default function CategoryFilter({
  categories,
}: {
  categories: CategoryI[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  function handleChange(categoryId: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", categoryId);
    params.set("page", "1"); // reset pagination
    router.push(`?${params.toString()}`);
  }
  return (
    <div>
      <h3 className="font-semibold mb-3">Category</h3>
      {categories.map((cat) => (
        <>
          <label
            className={`flex items-center my-2 justify-between px-3 py-2 rounded-lg cursor-pointer border transition
    ${selectedCategory === cat._id
                ? "bg-purple-100 border-purple-300 text-purple-700"
                : "hover:bg-primary hover:text-neutral-700"}`}
          >
            <span className="text-text-main">{cat.name}</span>
            <input
              type="radio"
              className="hidden"
              checked={selectedCategory === cat._id}
              onChange={() => handleChange(cat._id)}
            />
          </label>
        </>
      ))}
    </div>
  );
}
