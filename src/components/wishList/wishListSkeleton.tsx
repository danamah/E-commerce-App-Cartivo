import { Skeleton } from "@/components/ui/skeleton"

export default function WishListSkeleton() {
    return (
        <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="border rounded-2xl p-6 flex flex-col md:flex-row gap-6"
                >
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-5 w-20" />
                        <div className="flex gap-3 mt-4">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-6 w-10" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                </div>
            ))}
        </div>
    )
}
