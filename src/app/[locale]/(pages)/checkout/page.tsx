import { getLoggedUserCart } from "@/actions/cart.action";
import { getLoggedUserAdresses } from "@/actions/profile.action";
import CheckoutClient from "@/components/orders/checkOutClient";
import CheckoutHeader from "@/components/orders/checkOutHeader";

export default async function CheckoutPage() {
  const cart = await getLoggedUserCart();
  const addresses = await getLoggedUserAdresses();

  return (
    <div className="container mx-auto px-4 py-10">
      <CheckoutHeader />
      <CheckoutClient
        initialCart={cart}
        initialAddresses={addresses}
      />
    </div>
  );
}