import ProductCard from "./product-card";
import { ProductsI } from "@/types/products";

export default function ProductsGrid({
  products,
}: {
  products: ProductsI[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
