"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect() {
    const t = useTranslations("productDetails");
    const router = useRouter();
    const params = useSearchParams();
    function handleSort(value: string) {
        const query = new URLSearchParams(params.toString());

        query.set("sort", value);
        query.set("page", "1"); // reset pagination

        router.push(`?${query.toString()}`);
    }
    return (
        <div className="flex items-center gap-2 justify-end my-2 pt-2 px-4">
            <span className="text-sm text-muted-foreground">
                {t("SortBy")}
            </span>
            <Select onValueChange={handleSort}>
                <SelectTrigger className="w-55">
                    <SelectValue placeholder="Newest" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="-createdAt">{t("Newest")}</SelectItem>
                    <SelectItem value="createdAt">{t("Oldest")}</SelectItem>
                    <SelectItem value="price">{t("LowtoHigh")}</SelectItem>
                    <SelectItem value="-price">{t("HightoLow")}</SelectItem>
                    <SelectItem value="-ratingsAverage">{t("HighestRated")}</SelectItem>
                    <SelectItem value="-sold">{t("BestSelling")}</SelectItem>
                    <SelectItem value="title">{t("A-Z")}</SelectItem>
                    <SelectItem value="-title">{t("Z-A")}</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
