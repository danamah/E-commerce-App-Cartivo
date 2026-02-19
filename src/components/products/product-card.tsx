import { ProductsI } from "@/types/products";
import Image from "next/image";
import { Heart, Eye, Repeat, Star, Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ProductCard({product,}: {product: ProductsI;}) {
  return (
    <div className="rounded-xl border border-border bg-card p-2 hover:shadow-lg transition">
      <div className="relative">
        <Image
          src={product.imageCover}
          alt={product.title}
          width={300}
          height={300}
          className="rounded-lg object-cover"
        />
        <div className="absolute right-2 top-2 flex flex-col gap-2">
          <Button className="p-2 bg-primary/70 rounded-full shadow">
            <Heart size={18} />
          </Button>
          <Button className="p-2 bg-primary/70 rounded-full shadow">
            <Repeat size={18} />
          </Button>
          <Link href={`/products/${product._id}`}>
          <Button className="p-2 bg-primary/70 rounded-full shadow">
            <Eye size={18} />
          </Button>
          </Link>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-3">
        {product.category.name}
      </p>
      <h3 className="font-semibold text-lg">
        {product.title}
      </h3>
      <div className="flex items-center gap-1 mt-2">
        <Star className="fill-yellow-400 text-yellow-400" size={16} />
        <span>{product.ratingsAverage}</span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-xl">
          {product.price} EGP
        </span>
        <Button className="bg-primary text-primary-foreground rounded-full hover:scale-105 transition">
          <Plus className="size-4"/>
        </Button>
      </div>
    </div>
  );
}

