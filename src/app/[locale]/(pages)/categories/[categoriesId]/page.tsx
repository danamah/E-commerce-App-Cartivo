import { getSpecificCategory } from '@/services/categories.services'
import { CategoryI } from '@/types/category'
import { param } from 'framer-motion/client'
import React from 'react'

export default async function CategoriesId({ params }: { params: Promise<{categoriesId:string}> }) {
  const {categoriesId} = await params
  const {data} = await getSpecificCategory(categoriesId)
  console.log(categoriesId)
  const cateId:CategoryI =data
  return (
    <>
    </>
  )
}
