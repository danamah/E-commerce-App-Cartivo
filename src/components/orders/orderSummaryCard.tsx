"use client"
import { Card } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type CartItem = {
  count: number;
  price: number;
  product: { title: string; imageCover: string };
};

type Props = {
  cartItems: CartItem[];
  totalCartPrice: number;
};

export default function OrderSummaryCard({ cartItems, totalCartPrice }: Props) {
  const t = useTranslations("summeryPayment");
  return (
    <Card className="p-6 rounded-2xl border-green-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-3 rounded-full">
          <ShoppingBag className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold">{t("OrderSummery")}</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {cartItems.length} {t("items")}
      </p>
      <div className="space-y-4">
        {cartItems.map((item, i) => (
          <div key={i} className="flex gap-4">
           <Image width={80} height={80} src={item.product.imageCover} alt={item.product.title} className="object-cover rounded"/>
            <div>
              <p className="font-medium">{item.product.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.count} × {item.price} EGP
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between mb-2">
          <span>{t("Subtotal")}</span>
          <span>{totalCartPrice} EGP</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>{t("Shipping")}</span>
          <span className="text-green-600">{t("Free")}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>{t("Total")}</span>
          <span>{totalCartPrice} EGP</span>
        </div>
      </div>
    </Card>
  );
}