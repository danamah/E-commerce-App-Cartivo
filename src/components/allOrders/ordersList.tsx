"use client";

import OrderCard from "./orderCard";
import { Order } from "@/types/allOrders";

type Props = {
  orders: Order[];
};
export default function OrdersList({ orders }: Props) {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}