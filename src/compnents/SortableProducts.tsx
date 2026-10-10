"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { toBn } from "@/lib/bangla";
import type { Category, Product } from "@/lib/types";

type SortKey = "default" | "asc" | "desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
    { value: "default", label: "ডিফল্ট" },
    { value: "asc", label: "দাম: কম থেকে বেশি" },
    { value: "desc", label: "দাম: বেশি থেকে কম" },
];

interface Props {
    products: Product[];
    withFilters?: boolean;
    categories?: Category[];
}

export default function SortableProducts({
    products,
    withFilters = false,
    categories = [],
}: Props) {
    const [sort, setSort] = useState<SortKey>("default");
    const [query, setQuery] = useState("");
    const [cat, setCat] = useState("all");

    const visible = useMemo(() => {
        let list = products;
        if (cat !== "all") list = list.filter((p) => p.category === cat);
        const q = query.trim();
        if (q) list = list.filter((p) => p.nameBn.includes(q));

        if (sort === "asc") return [...list].sort((a, b) => a.today - b.today);
        if (sort === "desc") return [...list].sort((a, b) => b.today - a.today);
        return list;
    }, [products, sort, query, cat]);

    return (
        <div>
            <div className="mb-4 flex flex-col gap-3">
                {withFilters && (
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="পণ্যের নাম লিখুন…"
                            aria-label="পণ্য খুঁজুন"
                            className="input w-full rounded-full border-line bg-white sm:max-w-xs"
                        />
                        <div className="no-scrollbar flex gap-2 overflow-x-auto">
                            {[{ slug: "all", name: "সব" }, ...categories].map(
                                (c) => (
                                    <button
                                        key={c.slug}
                                        onClick={() => setCat(c.slug)}
                                        aria-pressed={cat === c.slug}
                                        className={`shrink-0 rounded-full border px-3 py-1 text-sm transition ${
                                            cat === c.slug
                                                ? "border-brand bg-brand text-white"
                                                : "border-line bg-white text-ink hover:border-brand"
                                        }`}
                                    >
                                        {c.slug}
                                    </button>
                                ),
                            )}
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted">
                        মোট {toBn(visible.length)}টি পণ্য দেখানো হচ্ছে
                    </p>
                    <label className="flex items-center gap-2 text-sm">
                        <span className="text-muted">সাজান:</span>
                        <span className="relative">
                            <select
                                value={sort}
                                onChange={(e) =>
                                    setSort(e.target.value as SortKey)
                                }
                                className="select select-sm sm:select-md w-full appearance-none rounded-full border-line bg-white pr-9"
                            >
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                            <svg
                                aria-hidden
                                viewBox="0 0 20 20"
                                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    d="m5 7.5 5 5 5-5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </label>
                </div>
            </div>

            {visible.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-line bg-white p-8 text-center text-muted">
                    কোনো পণ্য পাওয়া যায়নি।
                </p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {visible.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    );
}
