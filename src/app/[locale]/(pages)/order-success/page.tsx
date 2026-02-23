"use client"
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function OrderSuccessPage() {
  const t = useTranslations("orderSuccess");
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
        <p className="text-lg text-muted-foreground mb-8">
          {t("subTitle")}
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-purple-700">
          <Link href="/">{t("contBtn")}</Link>
        </Button>
      </div>
    </div>
  );
}