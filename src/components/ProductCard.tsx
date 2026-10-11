import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { formatTaka } from "@/lib/bangla";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`/product/${product.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
        >
            <div className="flex items-center gap-3">
                <span
                    aria-hidden
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-2xl"
                >
                    {product.image}
                </span>
                <div className="min-w-0">
                    <h3 className="truncate font-semibold text-ink group-hover:text-brand-dark">
                        {product.nameBn}
                    </h3>
                    <p className="text-sm text-muted">প্রতি {product.unit}</p>
                </div>
            </div>

            <div className="flex items-end justify-between gap-2 border-t border-dashed border-line pt-3">
                <div>
                    <p className="text-xs text-muted">আজকের দাম</p>
                    <p className="text-lg font-bold text-ink">
                        {formatTaka(product?.today)}
                    </p>
                </div>
                <ChangeBadge value={product?.change?.pct} />
            </div>
        </Link>
    );
}
