"use client"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Settings } from "lucide-react"
import { useTranslations } from "next-intl";

export default function ProfileSidebar() {
    const t = useTranslations("profile");
  return (
    <Card className="rounded-2xl shadow-sm h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">
          {t("MyAccount")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TabsList className="flex lg:flex-col gap-2 w-full bg-transparent p-0 pb-2">
          <TabsTrigger
            value="addresses"
            className="flex items-center justify-between w-full gap-3 
            data-[state=active]:bg-primary 
            data-[state=active]:text-white 
            rounded-xl py-3 px-4"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" />
              {("AllMyAddresses")}
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex items-center justify-between w-full gap-3 
            data-[state=active]:bg-primary 
            data-[state=active]:text-white 
            rounded-xl py-3 px-4"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4" />
              {t("Settings")}
            </div>
          </TabsTrigger>
        </TabsList>
      </CardContent>
    </Card>
  )
}
