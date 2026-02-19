import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cartivo | Smart Online Shopping Experience",
  description: "Cartivo is a modern online marketplace offering smart shopping, fast deals, and seamless digital experiences across multiple product categories",
};

export default async function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
                {children}
              <Footer/>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
