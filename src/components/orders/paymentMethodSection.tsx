"use client";

import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Banknote, CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import visa from "../../../public/pay-img/visa.png";
import master from "../../../public/pay-img/mastercard.png";
import amex from "../../../public/pay-img/Amex.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {
  onPaymentMethodChange: (method: "cash" | "online") => void;
};

export default function PaymentMethodSection({ onPaymentMethodChange }: Props) {
  const [selectedMethod, setSelectedMethod] = useState<"cash" | "online">("cash");
  const t = useTranslations("checkOut");
  const handleChange = (value: "cash" | "online") => {
    setSelectedMethod(value);
    onPaymentMethodChange(value);
  };

  return (
    <Card className="p-6 rounded-2xl">
      <h2 className="text-xl font-bold mb-6">{t("PaymentMethod")}</h2>
      <p className="text-sm text-muted-foreground mb-6">
        {t("ChooseHowToPay")}
      </p>

      <RadioGroup
        value={selectedMethod}
        onValueChange={(value) => handleChange(value as "cash" | "online")}
        className="space-y-4"
      >
        <div className="flex items-start gap-4 border rounded-lg p-4 cursor-pointer hover:border-primary transition">
          <RadioGroupItem value="cash" id="cash" className="mt-1" />
          <label htmlFor="cash" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-3 mb-1">
              <Banknote className="text-green-600" />
              <p className="font-medium">{t("CashOnDelivery")}</p>
              {selectedMethod === "cash" && (
                <span className="ml-auto text-green-600 text-sm font-medium">{t("Selected")}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {t("Cash")}
            </p>
          </label>
        </div>
        <div className="flex items-start gap-4 border rounded-lg p-4 cursor-pointer hover:border-primary transition">
          <RadioGroupItem value="online" id="online" className="mt-1" />
          <label htmlFor="online" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-3 mb-1">
              <CreditCard className="text-primary" />
              <p className="font-medium">{t("PayOnline")}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("SecurePayment")}
            </p>
            <div className="flex gap-2 mt-2">
              <Image src={visa} alt="Visa" width={40} height={24} />
              <Image src={master} alt="Mastercard" width={40} height={24} />
              <Image src={amex} alt="Amex" width={40} height={24} />
            </div>
          </label>
        </div>
      </RadioGroup>
      <div className="mt-6 pt-4 border-t flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-4 w-4" />
        <span>{t("Secure")}</span>
        <span>•</span>
        <span>{t("Protection")}</span>
      </div>
    </Card>
  );
}