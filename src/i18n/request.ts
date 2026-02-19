// src/i18n/request.ts

import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as 'ar' | 'en';

  
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale as 'ar' | 'en';
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});