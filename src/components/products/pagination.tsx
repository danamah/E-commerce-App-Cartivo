"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";

import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function PaginationSection({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) {
    const params = useSearchParams();

    const createPageLink = (page: number) => {
        const query = new URLSearchParams(params);
        query.set("page", page.toString());
        return `?${query.toString()}`;
    };

    return (
        <Pagination className="my-6">
            <PaginationContent>

                {/* Previous Button */}
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href={createPageLink(currentPage - 1)} />
                    </PaginationItem>
                )}

                {/* Page Numbers */}
                {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href={createPageLink(page)}
                                className={cn(
                                    "transition-colors",
                                    currentPage === page &&
                                    "bg-purple-200 text-purple-700 hover:bg-purple-300 font-semibold"
                                )}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Next Button */}
                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext href={createPageLink(currentPage + 1)} />
                    </PaginationItem>
                )}

            </PaginationContent>
        </Pagination>
    );
}
