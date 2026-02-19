// components/LanguageSwitcher.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
    const t = useTranslations('Common'); 
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        const currentPath = pathname.replace(/^\/(ar|en)/, '') || '/';
        const newPath = `/${newLocale}${currentPath}`;
        router.push(newPath);
        router.refresh(); 
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-lg"
                    className="relative px-7"
                    aria-label={t('changeLanguage')}
                >
                    <Globe className="h-5 w-5" />
                    {locale === "en" ? <span>EN</span> : <span>العربية</span>}
                    <span className="sr-only">{t('changeLanguage')}</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-[140px]">
                <DropdownMenuItem
                    onClick={() => switchLocale('ar')}
                    className={cn(
                        'cursor-pointer gap-2',
                        locale === 'ar' && 'bg-accent text-accent-foreground'
                    )}
                >
                    <span className="font-medium">العربية</span>
                    {locale === 'ar' && <span className="ml-auto text-xs opacity-70">✓</span>}
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => switchLocale('en')}
                    className={cn(
                        'cursor-pointer gap-2',
                        locale === 'en' && 'bg-accent text-accent-foreground'
                    )}
                >
                    <span className="font-medium">English</span>
                    {locale === 'en' && <span className="ml-auto text-xs opacity-70">✓</span>}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
