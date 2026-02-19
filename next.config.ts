import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'   
);
const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"ecommerce.routemisr.com",
        pathname:"/Route-Academy-products/*"
      },
      {
        protocol:"https",
        hostname:"ecommerce.routemisr.com",
        pathname:"/Route-Academy-categories/*"
      },
      {
        protocol:"https",
        hostname:"ecommerce.routemisr.com",
        pathname:"/Route-Academy-brands/*"
      },

    ]
  },
  reactCompiler: true,

 
};

export default withNextIntl(nextConfig);
