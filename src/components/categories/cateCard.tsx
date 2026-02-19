import { CategoryI } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

export default function CateCard({
    category,
}: {
    category: CategoryI;
}) {
    return (
        <Link
            href={`/products?category=${category._id}`}
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        >
            <div className="relative h-56 w-full">
                <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-purple-900/70 via-purple-700/40 to-transparent opacity-90 group-hover:opacity-100 transition" />
            <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl font-bold tracking-wide">
                    {category.name}
                </h3>
                <span className="text-sm text-purple-200 group-hover:text-white transition">
                    Explore Now →
                </span>
            </div>
        </Link>
    );
}
