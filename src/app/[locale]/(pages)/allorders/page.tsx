"use client"

import OrdersList from "@/components/allOrders/ordersList"
import EmptyOrders from "@/components/allOrders/emptyOrders"

type Order = {
  _id: string
  totalOrderPrice: number
  isPaid: boolean
  isDelivered: boolean
  paymentMethodType: string
  createdAt: string
  cartItems: {
    _id: string
    product: {
      title: string
      imageCover: string
    }
    count: number
    price: number
  }[]
}
export default function OrdersPage() {
  // 👇 بعدين هتحطي هنا getUserOrders()
  const orders: Order[] = []
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">
          Track and manage your purchases
        </p>
      </div>

      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <OrdersList orders={orders} />
      )}

    </div>
  )
}

