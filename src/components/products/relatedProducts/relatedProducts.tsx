import ProductsSlider from "./productsSlider";
import { ProductsI } from "@/types/products";

export default function RelatedProducts({products,}: {products: ProductsI[];}) {
  return (
    <section className="mt-16 lg:mx-2 mx-1 px-5 lg:px-6 ">
      <h2 className="text-2xl font-bold mb-6">
        You May Also Like
      </h2>
      <ProductsSlider products={products} />
    </section>
  );
}
