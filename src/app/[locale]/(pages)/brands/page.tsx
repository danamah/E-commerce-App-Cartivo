import BrandCard from '@/components/brands/brandCard'
import Header from '@/components/brands/header'
import { getAllBrands } from '@/services/brands.services'
import { BrandI } from '@/types/brand'
import React from 'react'

export default async function Brands() {
    const { data } = await getAllBrands()
    const brands: BrandI[] = data
    console.log(brands)
    return (
        <>
            <Header />
            <main className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {brands.map((brand) => (
                        <BrandCard key={brand._id} brand={brand} />
                    ))}
                </div>
            </main>
        </>
    )
}
