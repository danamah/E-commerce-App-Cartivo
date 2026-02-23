"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";
import icon from "@/app/[locale]/icon.png";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image src={icon} width={35} height={35} alt="Cartivo logo" />
              <h2 className="text-2xl font-bold text-white">Cartivo</h2>
            </div>
            <p className="text-sm leading-6 text-slate-400 mb-6">
              {t("description")}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>{t("contact.phone")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>{t("contact.email")}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>{t("contact.address")}</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Facebook className="hover:text-primary cursor-pointer transition" />
              <Twitter className="hover:text-primary cursor-pointer transition" />
              <Instagram className="hover:text-primary cursor-pointer transition" />
              <Youtube className="hover:text-primary cursor-pointer transition" />
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">{t("shop.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-primary transition">
                  {t("shop.allProducts")}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition">
                  {t("shop.categories")}
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-primary transition">
                  {t("shop.brands")}
                </Link>
              </li>
              <li>
                <Link href="/categories/men" className="hover:text-primary transition">
                  {t("shop.mensFashion")}
                </Link>
              </li>
              <li>
                <Link href="/categories/women" className="hover:text-primary transition">
                  {t("shop.womensFashion")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">{t("account.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="hover:text-primary transition">
                  {t("account.signIn")}
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition">
                  {t("account.createAccount")}
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-primary transition">
                  {t("account.wishlist")}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary transition">
                  {t("account.cart")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">{t("support.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  {t("support.contactUs")}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary transition">
                  {t("support.shippingInfo")}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary transition">
                  {t("support.returnsRefunds")}
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-primary transition">
                  {t("support.trackOrder")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>{t("copyright", { year })}</p>
          <div className="flex items-center gap-4">
            <CreditCard size={18} />
            <span>{t("paymentMethods")}</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}