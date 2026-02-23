"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Order } from "@/types/allOrders";

type Props = {
  order: Order;
};

export default function OrderCard({ order }: Props) {
  return (
    <Card className="p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Order ID</p>
          <p className="font-semibold">#{order._id.slice(-6)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="font-medium">
            {new Date(order.createdAt).toLocaleDateString("en-GB")}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant={order.isPaid ? "default" : "secondary"}>
            {order.isPaid ? "Paid" : "Pending"}
          </Badge>

          <Badge variant={order.isDelivered ? "default" : "outline"}>
            {order.isDelivered ? "Delivered" : "Processing"}
          </Badge>
        </div>

        <div className="text-lg font-bold text-primary">
          {order.totalOrderPrice} EGP
        </div>
      </div>
      <div className="space-y-4">
        {order.cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border-t pt-4"
          >
            <Image
              src={item.product.imageCover}
              alt={item.product.title}
              width={80}
              height={80}
              className="object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium">{item.product.title}</p>
              <p className="text-sm text-muted-foreground">
                Qty: {item.count}
              </p>
            </div>
            <div className="font-semibold">
              {item.price} EGP
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}