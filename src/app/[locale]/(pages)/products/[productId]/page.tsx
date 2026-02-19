import ProductCarousel from '@/components/products/carousel'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getSpecificProduct } from '@/services/products.services'
import { ProductsIdType } from '@/types/productId'
import { ProductsI } from '@/types/products'
import { Heart, ShoppingCart, Star, StarHalf } from 'lucide-react'

export default async function ProductsDetails({ params }: { params: Promise<{productId:string}> }) {
  const { productId } = await params
  const { data } = await getSpecificProduct(productId)
  console.log(productId)
  console.log(data)
  const product: ProductsI = data
  return (
    <>
      <main>
        <div className="container mx-auto px-20">
          <Breadcrumb className='py-5'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className='text-lg' href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className='text-lg' href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className='text-lg font-bold'>Products Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="my-3 card">
            <Card className='h-full'>
              <div className='grid grid-cols-3'>
                <ProductCarousel
                  images={product?.images}
                  title={product?.title}
                />
                <div className="right-side grow space-y-7 my-auto px-3 col-span-2">
                  <CardHeader>
                    <CardDescription>{product?.brand.name}</CardDescription>
                    <CardTitle>{product?.title}</CardTitle>
                    <CardDescription>{product?.category.name}</CardDescription>
                    <CardDescription>{product?.description}</CardDescription>
                  </CardHeader>
                  <CardContent className='flex items-center'>
                    {[...Array(5)].map((_, index) => {
                      const fullStar = Math.floor(product?.ratingsAverage)
                      const halfStar = product?.ratingsAverage % 1 !== 0

                      if (index + 1 <= fullStar) {
                        return <Star key={index} className="size-6 text-yellow-500 fill-yellow-500" />
                      }

                      if (index + 1 === fullStar + 1 && halfStar) {
                        return <StarHalf key={index} className="size-6 text-yellow-500 fill-yellow-500" />
                      }

                      return <Star key={index} className="size-6 text-gray-400 fill-gray-400" />
                    })}
                    <p className='font-medium ms-2'>{product?.ratingsAverage}</p>

                  </CardContent>
                  <CardContent>
                    <p className='font-bold'>Price: {product?.price}EGP</p>
                  </CardContent>
                  <CardFooter className='flex items-center space-x-2'>
                    <Button className='grow'>Add To Cart <ShoppingCart className='size-6' /></Button>
                    <Heart className='size-6 hover:text-red-500 transition-colors duration-200' />
                  </CardFooter>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
