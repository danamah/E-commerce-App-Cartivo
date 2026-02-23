import { getUserOrders } from "@/actions/orders.action";
import OrdersList from "@/components/allOrders/ordersList";
import EmptyOrders from "@/components/allOrders/emptyOrders";
import Header from "@/components/allOrders/header";

export default async function OrdersPage() {
  const orders = await getUserOrders();

  return (
    <>
     <Header/>
    <div className="container mx-auto px-4 py-10">
      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
    </>
    
  );
}