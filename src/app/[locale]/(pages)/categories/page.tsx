import CateCard from '@/components/categories/cateCard'
import Header from '@/components/categories/header'
import { getAllCategories } from '@/services/categories.services'
import { CategoryI } from '@/types/category'
import React from 'react'

export default async function Categories() {
    const {data} = await getAllCategories()
    const cate:CategoryI[] = data
    console.log(cate)
  return (
    <>
    <Header/>
    <main className="container mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cate.map((category) => (
            <CateCard key={category._id} category={category} />
          ))}
        </div>
      </main>
    </>
  )
}
