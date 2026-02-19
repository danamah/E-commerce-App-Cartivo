"use client"
import { Flame, MoveRight, Sparkles } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import Link from 'next/link'
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function OffersCards() {
  const t = useTranslations("OffersSection")
  return (
    <main className='my-4 px-2'>
      <div className="grid grid-cols-12 gap-3">
        <div className="card-one col-span-12 md:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="inner bg-linear-to-br from-violet-600 via-fuchsia-600 to-purple-700 rounded-2xl shadow-xl p-6 space-y-3 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <Badge className="bg-white/20 text-white border-none">
                <Flame className="w-4 h-4 mr-1 text-orange-400" />
                {t("badge")}
              </Badge>
              <h2 className='text-2xl font-black'>{t("card1.title")}</h2>
              <p className='text-white/80'>
                {t("card1.description")}
              </p>
              <h2 className='text-2xl font-bold'>
                {t("card1.discount")}
                <span className='ml-2 text-sm font-medium text-white/70'>{t("card1.useCode")}</span>
                <span className='ml-2 text-base font-extrabold'> {t("card1.code")}</span>
              </h2>
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-white text-violet-700 hover:bg-white/90"
              >
                <Link href="/products">
                  {t("card1.button")} <MoveRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="card-two col-span-12 md:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
          <div className="inner bg-linear-to-br from-orange-600 via-amber-600 to-yellow-700 
rounded-2xl shadow-xl p-6 space-y-3 text-white relative overflow-hidden">

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

            <Badge className="bg-white/20 text-white border-none">
              <Sparkles className="w-6 h-6 mr-1 text-amber-300" />
             {t("badge")}
            </Badge>

            <h2 className='text-2xl font-black'>{t("card2.title")}</h2>

            <p className='text-white/80'>
              {t("card2.description")}
            </p>

            <h2 className='text-2xl font-bold'>
             {t("card2.discount")}
              <span className='ml-2 text-sm font-medium text-white/70'>{t("card1.useCode")}</span>
              <span className='ml-2 text-base font-extrabold'> {t("card2.code")}</span>
            </h2>

            <Button
              asChild
              size="lg"
              className="rounded-full px-8 bg-white text-violet-700 hover:bg-white/90"
            >
              <Link href="/products">
                {t("card2.button")} <MoveRight className="ml-2" />
              </Link>
            </Button>
          </div>
          </motion.div>

        </div>
      </div>
    </main>
  )
}
