// components/home/brands-marquee.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BrandI } from '@/types/brand';
import { Spinner } from '../ui/spinner';

export default function BrandsMarquee() {
  const [brands, setBrands] = useState<BrandI[]>([]);

  useEffect(() => {
    async function fetchBrands() {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
      const data = await res.json();
      setBrands(data.data || []);  
    }
    fetchBrands();
  }, []);

  if (brands.length === 0) return <p><Spinner/></p>;

  return (
    <div className="bg-card py-4 overflow-hidden">
      <div className="marquee flex animate-marquee flex-row ltr:flex-row rtl:flex-row-reverse">
        {brands.concat(brands).map((brand, index) => (
          <div key={`${brand._id}-${index}`} className="shrink-0 mx-8">
            <Image
              src={brand.image}
              alt={brand.name}
              width={50}
              height={40}
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
