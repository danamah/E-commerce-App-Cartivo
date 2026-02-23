"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import loginBg from "../../../../public/Auth-hero-bg/login.jpg"; 
import { motion } from "framer-motion"; 

export default function LayOut() {
  const t = useTranslations("Auth.Login"); 

  return (
    <div className="relative h-full min-h-screen overflow-hidden rounded-2xl">
      <Image
        src={loginBg}
        alt="Auth background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/70 via-indigo-900/60 to-black/50 dark:from-purple-950/80 dark:via-indigo-950/70 dark:to-black/70 transition-colors duration-300" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
        className="absolute inset-0 flex items-center justify-center p-8"
      >
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-8 max-w-md text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            {t("welcomeTitle")}
          </h2>
          <p className="text-lg text-gray-200 dark:text-gray-300 leading-relaxed">
            {t("welcomeSubtitle")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}