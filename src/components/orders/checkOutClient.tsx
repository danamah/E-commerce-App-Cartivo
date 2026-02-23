"use client";

import { createCashOrder, checkOutOnlineSession, ShippingAddress } from "@/actions/orders.action";
import OrderSummaryCard from "@/components/orders/orderSummaryCard";
import PaymentMethodSection from "@/components/orders/paymentMethodSection";
import ShippingAddressCard from "@/components/orders/shippingAddressCart";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/providers/cart-provider";
import { AddressI } from "@/types/address";
import { CartI } from "@/types/cart";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

type Props = {
    initialCart: CartI | null;
    initialAddresses: AddressI[];
};

export default function CheckoutClient({ initialCart: cart, initialAddresses: addresses }: Props) {
    const [selectedShipping, setSelectedShipping] = useState<ShippingAddress | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
    const { handleCart } = useContext(cartContext);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = async () => {
        if (!cart?.data?._id) {
            toast.error("No cart found");
            return;
        }

        if (!selectedShipping) {
            toast.error("Please select or enter a shipping address");
            return;
        }

        setLoading(true);

        try {
            if (paymentMethod === "cash") {
                const res = await createCashOrder(cart.data._id, selectedShipping);
                console.log(res);

                if (res.status === "success") {
                    toast.success("Order placed successfully! 🎉 We will contact you soon.");
                    handleCart();
                    router.replace("/order-success");
                } else {
                    toast.error(res.message || "Failed to place order");
                }
            } else {
                const res = await checkOutOnlineSession(cart.data._id, selectedShipping);
                console.log(res);

                if (res.status === "success" && res.session?.url) {
                    toast.info("Redirecting to secure payment page...");
                    window.location.href = res.session.url;
                } else {
                    toast.error(res.message || "Failed to create payment session");
                }
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <ShippingAddressCard
                    savedAddresses={addresses}
                    onSelectAddress={setSelectedShipping}
                />
                <PaymentMethodSection onPaymentMethodChange={setPaymentMethod} />
            </div>

            <div className="lg:col-span-1">
                <OrderSummaryCard
                    cartItems={cart?.data?.products || []}
                    totalCartPrice={cart?.data?.totalCartPrice || 0}
                />

                <Button
                    onClick={handlePlaceOrder}
                    disabled={loading || !selectedShipping || !cart?.data?._id}
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 text-md rounded-lg"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Spinner className="h-5 w-5" />
                            <span>
                                {paymentMethod === "cash" ? "Placing Order..." : "Redirecting to Payment..."}
                            </span>
                        </div>
                    ) : (
                        `Place Order ${paymentMethod === "cash" ? "(Cash on Delivery)" : "(Pay Online)"}`
                    )}
                </Button>
            </div>
        </div>
    );
}