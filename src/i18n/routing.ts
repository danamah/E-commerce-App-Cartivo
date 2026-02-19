// src/i18n/routing.ts

import createMiddleware from "next-intl/middleware";

export const routing = {
  locales: ['ar', 'en'] as const,   
  defaultLocale: 'en' as const,             
  localePrefix: 'always',           
  pathnames: {},                    
} satisfies Parameters<typeof createMiddleware>[0];