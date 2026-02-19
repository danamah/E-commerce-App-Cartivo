'use client'; 

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Meh } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    const t = useTranslations('NotFound');

    return (
        <main className="bg-linear-to-r from-[#8A5CF6] to-[#4F46E5] min-h-screen flex items-center justify-center p-4">
            <div className="error-card px-6 py-10 w-full max-w-lg text-center rounded-2xl shadow-2xl bg-linear-to-r from-[#8867F2] to-[#6F5EEB] border border-white/20">
                <div className="relative mb-6">
                    <h1 className="text-8xl font-black bg-linear-to-t from-cyan-400 to-cyan-100 bg-clip-text text-transparent">
                        404
                    </h1>
                    <Meh className="absolute -top-4 right-1/4 text-amber-300 animate-bounce" />
                </div>
                <p className="text-white font-black text-4xl mb-4">
                    {t('oops')} <br />
                    <span className="text-2xl">{t('pageNotFound')}</span>
                </p>
                <p className="text-gray-200 text-lg mb-8">
                    {t('description')}
                </p>
                <Button asChild size="lg" className="rounded-2xl text-lg font-bold px-10 shadow-xl hover:-translate-y-1 transition-transform">
                    <Link href="/">{t('goHome')}</Link>
                </Button>
            </div>
        </main>
    );
}