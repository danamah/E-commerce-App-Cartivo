import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/authOption";
import { getUserOrders } from "@/actions/orders.action";
import OrdersList from "@/components/allOrders/ordersList";
import EmptyOrders from "@/components/allOrders/emptyOrders";
import { jwtDecode }from "jwt-decode";
import Link from "next/link";

interface DecodedToken {
  id: string;
}

export default async function OrdersPage() {
  const session = await getServerSession(AuthOptions);

  console.log("Session:", session);
  if (!session?.token) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Login to display your orders</h2>
        <Link href="/login" className="text-purple-600 hover:underline mt-4 inline-block">
        Login
        </Link>
      </div>
    );
  }


  let userId: string | null = null;
  try {
    const decoded: DecodedToken = jwtDecode(session.token);
    userId = decoded.id;
    console.log("Decoded Token:", decoded); 
    console.log("Extracted userId:", userId);
  } catch (error) {
    console.error("Failed to decode token:", error);
  }

  if (!userId) {
    return <div className="text-center py-20">error in fetching data</div>;
  }

  const orders = await getUserOrders(userId);
  console.log("Fetched Orders:", orders);

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
  );
}