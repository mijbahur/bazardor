import { ProductGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
    return (
        <div>
            <div className="mb-6 flex items-center gap-3 border-b border-line pb-4">
                <div className="skeleton-box size-14 !rounded-2xl" />
                <div className="space-y-2">
                    <div className="skeleton-box h-6 w-40" />
                    <div className="skeleton-box h-4 w-56" />
                </div>
            </div>
            <ProductGridSkeleton count={8} />
        </div>
    );
}
