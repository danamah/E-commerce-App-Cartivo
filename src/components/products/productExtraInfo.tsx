"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductsIdType } from "@/types/productId"
import { PackageSearch, RotateCcw, ShieldCheck, Star, Truck, TruckElectric } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useTranslations } from "next-intl"


type Props = {
  product: ProductsIdType["data"]
}

export default function ProductExtraInfo({ product }: Props) {
  const t = useTranslations("productDetails");
  const rating = product?.ratingsAverage || 0
  const reviewsCount = product?.ratingsQuantity || 0
  return (
    <div className="mt-14">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-[95%] mx-auto lg-w-full grid-cols-3 bg-muted rounded-lg ">
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-background data-[state=active]:text-primary rounded-lg"
          >
            <PackageSearch className="size-4" /> <span className="text-sm md:text-md">{t("ProductDetails")}</span>
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-background data-[state=active]:text-primary rounded-lg"
          >
            <Star className="size-4" /><span className="text-sm md:text-md">{t("Reviews")}</span>({reviewsCount})
          </TabsTrigger>
          <TabsTrigger
            value="shipping"
            className="data-[state=active]:bg-background data-[state=active]:text-primary rounded-lg"
          >
            <Truck className="size-4" /><span className="text-xs md:text-md">{t("Shipping&Returns")}</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted p-6 rounded-2xl">
              <h3 className="font-semibold text-lg mb-4">
                {t("ProductInformation")}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("Category")}</span>
                  <span>{product?.category?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("Subcategory")}</span>
                  <span>{product?.subcategory?.[0]?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("Brand")}</span>
                  <span>{product?.brand?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("ItemsSold")}</span>
                  <span>{product?.sold}</span>
                </div>
              </div>
            </div>
            <div className="bg-muted p-6 rounded-2xl">
              <h3 className="font-semibold text-lg mb-4">
                {t("KeyFeatures")}
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  {t("PremiumQualityProduct")}
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  {t("100%AuthenticGuarantee")}
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  {t("Fast&SecurePackaging")}
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  {t("QualityTested")}
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-8 px-3">
          <div className="grid md:grid-cols-[250px_1fr] gap-10 items-start">
            <div className="space-y-4 text-center md:text-left">

              <h2 className="text-6xl font-bold">
                {rating.toFixed(1)}
              </h2>
              <div className="flex justify-center md:justify-start gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.round(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }
                  />
                ))}
              </div>
              <p className="text-muted-foreground">
                {t("BasedOn")} {reviewsCount} {t("reviews")}
              </p>
            </div>
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((star) => {
                const count =
                  product?.reviews?.filter(
                    (r) => Math.round(r.rating) === star
                  ).length || 0
                const percentage =
                  reviewsCount > 0
                    ? (count / reviewsCount) * 100
                    : 0
                return (
                  <div
                    key={star}
                    className="flex items-center gap-4"
                  >
                    <span className="w-12 text-sm text-muted-foreground">
                      {star} {t("star")}
                    </span>
                    <Progress
                      value={percentage}
                      className="flex-1 h-2"
                    />
                    <span className="w-12 text-sm text-muted-foreground text-right">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mt-12 space-y-6">
            {product?.reviews?.length > 0 ? (
              product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="border p-4 rounded-xl"
                >
                  <p className="font-medium">
                    {review.user.name}
                  </p>
                  <div className="flex gap-1 my-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.review}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-10">
                {t("NoReviews")}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="mt-10 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-primary/10 p-8 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <TruckElectric />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {t("ShippingInformation")}
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✔</span>
                      {t("FreeShipping")}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✔</span>
                      {t("StandardDelivery")}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✔</span>
                      {t("ExpressDelivery")}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✔</span>
                      {t("TrackOrder")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-primary/10 p-8 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <RotateCcw />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {t("Returns&Refunds")}
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✔</span>
                      {t("returns")}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✔</span>
                      {t("FullRefund")}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✔</span>
                      {t("FreeReturn")}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✔</span>
                      {t("EasyOnline")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-muted p-8 flex items-start gap-6">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl">
              <ShieldCheck />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {t("BuyerProtection")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("GetRef")}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
