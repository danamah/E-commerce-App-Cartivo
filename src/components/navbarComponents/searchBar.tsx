import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SearchBar() {
  const t = useTranslations("Navbar");
  return (
    <>
      <div className="flex w-full lg:w-60 overflow-hidden rounded-full border bg-background">
        <Button
          className="rounded-none bg-linear-to-r from-[#7C3AED] to-[#A855F7]"
        >
          <Search className="text-white" />
        </Button>
        <Input
          id="input-button-group"
          placeholder={t("searchPlaceholder")}
          className="
          border-0
          focus-visible:ring-0
          focus-visible:ring-offset-0
          focus:outline-none
          shadow-none
        "
        />
      </div>
    </>
  )
}
