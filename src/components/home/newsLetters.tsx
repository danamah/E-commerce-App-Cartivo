"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {  Mail, Smartphone, Sparkles, Star, Tag, Truck } from "lucide-react"
import { useTranslations } from "next-intl"
import apple from "../../../public/logos/apple-logo-svgrepo-com.svg"
import goolge from "../../../public/logos/google-play-style-svgrepo-com.svg"
import Image from "next/image"

export default function Newsletter() {
  const t = useTranslations("Newsletter")
  const t2 = useTranslations("MobileApp")

  return (
    <>
      <main className="grid grid-cols-12 gap-0.5">
        <section className="my-3 px-2 col-span-12 lg:col-span-8">
          <div className="relative overflow-hidden rounded-3xl 
      bg-linear-to-br from-violet-600 via-fuchsia-600 to-purple-700 
      p-8 md:p-12 text-white shadow-2xl">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Mail className="w-6 h-6" />
                </div>

                <div>
                  <Badge className="bg-white/20 text-white border-none">
                    {t("badge")}
                  </Badge>
                  <p className="text-sm text-white/80">
                    {t("subscribers")}
                  </p>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight">
                {t("title1")}
                <span className="block text-white/90">
                  {t("title2")}
                </span>
              </h2>
              <p className="text-white/80 text-lg">
                {t("description")}
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {t("feature1")}
                </span>

                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  {t("feature2")}
                </span>

                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {t("feature3")}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Input
                  type="email"
                  placeholder={t("placeholder")}
                  className="bg-white text-black rounded-full h-10"
                />

                <Button
                  size="lg"
                  className="rounded-full px-8 bg-black text-white hover:bg-black/80"
                >
                  {t("subscribe")}
                </Button>
              </div>
              <p className="text-xs text-white/70">
                {t("note")}
              </p>

            </div>
          </div>
        </section>
        <section className="social my-4 px-4 col-span-12 lg:col-span-4">
          <div className="inner space-y-2 rounded-2xl bg-linear-to-br from-[#111929] via-[#151F2E] to-[#152B35] 
      p-8 md:p-12 text-white shadow-2xl">
            <Badge className="bg-white/20 text-white border-none">
              <Smartphone />
              {t2("badge")}
            </Badge>
            <h2 className="text-3xl md:text-2xl font-black leading-tight">
              {t2("title")}
            </h2>
            <p className="text-white/80 text-lg">
              {t2("subtitle")}
            </p>
            <div className="apple flex items-center gap-2 p-2 rounded-xl border border-white/20 bg-[#303947] hover:bg-[#455063] transition-colors duration-200">
              <Image src={apple} alt="apple logo" height={30} width={30}/>
              <div>
                <p className="text-sm text-gray-300">{t2("down")}</p>
                <h3 className="text-lg font-bold">{t2("store1")}</h3>
              </div>
            </div>
            <div className="andi flex items-center gap-2 p-2 rounded-xl border border-white/20 bg-[#303947] hover:bg-[#455063] transition-colors duration-200">
              <Image src={goolge} alt="apple logo" height={30} width={30}/>
              <div>
                <p className="text-sm text-gray-300">{t2("down")}</p>
                <h3 className="text-lg font-bold">{t2("store2")}</h3>
              </div>
            </div>
            <div className="rating">
              <div className="stars flex items-center space-x-1 mt-4">
                <Star className="text-amber-300"/>
                <Star className="text-amber-300"/>
                <Star className="text-amber-300"/>
                <Star className="text-amber-300"/>
                <Star className="text-amber-300"/>
                <span className="text-sm text-gray-300">4.9 • 100K+ downloads</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
