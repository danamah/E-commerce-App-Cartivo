import ProductCarousel from '@/components/products/carousel'
import ProductDetailsActions from '@/components/products/productDetailsActions'
import ProductExtraInfo from '@/components/products/productExtraInfo'
import RelatedProducts from '@/components/products/relatedProducts/relatedProducts'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Card } from '@/components/ui/card'
import { getRelatedProducts, getSpecificProduct } from '@/services/products.services'
import { ProductsI } from '@/types/products'
import { Star, StarHalf } from 'lucide-react'

export default async function ProductsDetails({params,}: {params: Promise<{ productId: string }>}) {
  const { productId } = await params
  const { data } = await getSpecificProduct(productId)
  const product: ProductsI = data
  const { data: relatedProducts } =
  await getRelatedProducts(product.category._id);
  return (
    <main className="pb-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <Breadcrumb className="py-6 text-sm">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/products?category=${product?.category._id}`}
              >
                {product?.category.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>{product?.title}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="p-6 lg:p-10 rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <ProductCarousel
                images={product?.images}
                title={product?.title}
              />
            </div>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">
                {product?.brand.name}
              </p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                {product?.title}
              </h1>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, index) => {
                  const fullStar = Math.floor(product?.ratingsAverage)
                  const halfStar = product?.ratingsAverage % 1 !== 0
                  if (index + 1 <= fullStar) {
                    return (
                      <Star
                        key={index}
                        className="w-5 h-5 text-yellow-500 fill-yellow-500"
                      />
                    )
                  }
                  if (index + 1 === fullStar + 1 && halfStar) {
                    return (
                      <StarHalf
                        key={index}
                        className="w-5 h-5 text-yellow-500 fill-yellow-500"
                      />
                    )
                  }
                  return (
                    <Star
                      key={index}
                      className="w-5 h-5 text-gray-300 fill-gray-300"
                    />
                  )
                })}
                <span className="text-sm text-muted-foreground">
                  ({product?.ratingsQuantity} reviews)
                </span>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-3xl font-bold text-primary">
                  {product?.price} EGP
                </h2>

                {product?.quantity > 0 && (
                  <span className="px-4 py-1 text-sm bg-primary/10 text-primary rounded-full">
                    In Stock ({product?.quantity})
                  </span>
                )}
              </div>
              <div className="border-t pt-4 text-muted-foreground">
                {product?.description}
              </div>
              <ProductDetailsActions product={product} />
              {/* //~ Quantity Counter  */}
              {/* <div className="space-y-2">
                <p className="font-medium">Quantity</p>
                <div className="flex items-center justify-between border rounded-xl px-4 py-2 w-full md:w-60">
                  <Button className="p-2 hover:bg-muted hover:text-primary rounded-md transition">
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-semibold text-lg">1</span>
                  <Button className="p-2 hover:bg-muted hover:text-primary rounded-md transition">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {product?.quantity} available
                </p>
              </div> */}
              {/* //~Total Price */}
              {/* <div className="bg-muted p-4 rounded-xl flex justify-between items-center">
                <span className="text-muted-foreground">Total Price:</span>
                <span className="text-xl font-bold text-primary">
                  {product?.price}.00 EGP
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <Button className="w-full py-6 text-base">
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Add to Cart
                </Button>
                <div className="flex w-full items-center justify-between space-x-2">
                  <Button variant="secondary" className="py-6 w-[50%] text-base">
                    Buy Now
                  </Button>
                  <Button variant="outline" className="py-6 w-[50%] text-base flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Add to Wishlist
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
        </Card>
      </div>
      <div className="my-4 px-4">
        <ProductExtraInfo product={data}/>
      </div>
      <div className="my-4 px-4">
        <RelatedProducts products={relatedProducts}/>
      </div>
    </main>
  )
}


