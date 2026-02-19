import { BrandI } from "@/types/brand";
import Image from "next/image";
import Link from "next/link";

export default function BrandCard({
  brand,
}: {
  brand: BrandI;
}) {
  return (
    <Link
      href={`/products?brand=${brand._id}`}
      className="group relative flex items-center justify-center rounded-2xl border border-purple-100 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-purple-700/20 opacity-0 group-hover:opacity-100 transition duration-300" />
      <div className="relative h-24 w-full">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    </Link>
  );
}
