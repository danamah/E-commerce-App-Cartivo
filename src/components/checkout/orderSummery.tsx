"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Loader2, Receipt } from "lucide-react"
import { useTranslations } from "next-intl"

type Props = {
    subtotal: number;
    checkoutLoading: boolean;
    setCheckoutLoading: (loading: boolean) => void;
};

export default function OrderSummary({ subtotal, checkoutLoading, setCheckoutLoading }: Props) {
    const { data: session } = useSession()
    const t = useTranslations("cart");
    const handleCheckout = async () => {
        setCheckoutLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setCheckoutLoading(false);
    };

    return (
        <div className="bg-muted rounded-2xl p-6 h-fit space-y-6">
            <h2 className="text-xl font-semibold">{t("orderSummery")}</h2>
            <div className="flex justify-between text-sm">
                <span>{t("Subtotal")}</span>
                <span className="text-xl font-bold">{subtotal} EGP</span>
            </div>
            <div className="flex justify-between text-sm">
                <span>{t("Shipping")}</span>
                <span className="text-primary">
                    {t("CalculatedAtCheckout")}
                </span>
            </div>
            <hr />
            {session ? (
                <Button
                    asChild
                    disabled={checkoutLoading}
                    className="bg-linear-to-r from-[#7C3AED] to-[#A855F7] w-full hover:from-[#8a4ef2] hover:to-[#aa66e9] transition-colors duration-200"
                    onClick={handleCheckout}
                >
                    <Link href="/checkout" className="flex items-center justify-center gap-2">
                        {checkoutLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>{t("Processing")}</span>
                            </>
                        ) : (
                            <>
                                {t("ProceedToCheckout")}
                                <Receipt />
                            </>
                        )}
                    </Link>
                </Button>
            ) : (
                <Button asChild className="bg-linear-to-r from-[#7C3AED] to-[#A855F7] w-full hover:from-[#8a4ef2] hover:to-[#aa66e9] transition-colors duration-200">
                    <Link href="/login" className="flex items-center justify-center gap-2">
                        {t("LoginToCheckout")}
                    </Link>
                </Button>
            )}
        </div>
    )
}
