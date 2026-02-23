"use client"
import { Boxes } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb'

export default function Header() {
    const t = useTranslations("allOrders")
    return (
        <>
            <main className='bg-linear-to-br from-violet-600 via-fuchsia-600 to-purple-700 py-5 px-4'>
                <Breadcrumb className='py-3'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className='text-lg text-neutral-50' href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='text-neutral-50' />
                        <BreadcrumbItem>
                            <BreadcrumbLink className='text-lg text-neutral-50' href="/allorders">All Your Orders</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="heading flex space-x-4.5 items-center my-3">
                    <div className="icon shadow-lg border border-white/20 bg-[#c59fd1] rounded-lg p-2.5">
                        <Boxes className='size-8 lg:size-12 text-primary' />
                    </div>
                    <div className="text">
                        <h2 className='text-3xl lg:text-5xl font-bold text-neutral-100'>{t("title")}</h2>
                        <p className='text-md lg:text-lg font-medium text-accent py-1 lg:py-2'>{t("subTitle")}</p>
                    </div>
                </div>
            </main>
        </>
    )
}
