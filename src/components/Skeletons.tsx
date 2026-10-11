export function ProductCardSkeleton() {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4">
            <div className="flex items-center gap-3">
                <div className="skeleton-box size-12 shrink-0 !rounded-xl" />
                <div className="flex-1 space-y-2">
                    <div className="skeleton-box h-4 w-3/4" />
                    <div className="skeleton-box h-3 w-1/3" />
                </div>
            </div>
            <div className="flex items-end justify-between border-t border-dashed border-line pt-3">
                <div className="space-y-2">
                    <div className="skeleton-box h-3 w-14" />
                    <div className="skeleton-box h-5 w-24" />
                </div>
                <div className="skeleton-box h-5 w-14 !rounded-full" />
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div
            role="status"
            aria-label="লোড হচ্ছে…"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function PageSkeleton() {
    return (
        <div className="space-y-8">
            <div className="skeleton-box h-56 w-full !rounded-3xl" />
            <div className="space-y-4">
                <div className="skeleton-box h-6 w-48" />
                <ProductGridSkeleton count={4} />
            </div>
            <div className="space-y-4">
                <div className="skeleton-box h-6 w-48" />
                <ProductGridSkeleton count={4} />
            </div>
        </div>
    );
}
