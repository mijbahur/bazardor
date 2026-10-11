import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ChangeBadge from "@/components/ChangeBadge";
import { ProductDetailSkeleton } from "@/components/Skeletons";
import { getProduct } from "@/lib/api";
import { formatNumber, formatTaka, toBn } from "@/lib/bangla";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProduct(decodeURIComponent(slug));
    return { title: product?.nameBn ?? "পণ্য পাওয়া যায়নি" };
}

export default function ProductPage({ params }: Params) {
    return (
        <Suspense fallback={<ProductDetailSkeleton />}>
            <ProductContent params={params} />
        </Suspense>
    );
}

async function ProductContent({ params }: Params) {
    const { slug: rawSlug } = await params;
    const product = await getProduct(decodeURIComponent(rawSlug));
    if (!product) notFound();

    const priceDifference = Math.abs(product.today - product.yesterday);
    const trendText =
        product.change.dir === "up"
            ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${formatNumber(priceDifference)} টাকা`
            : product.change.dir === "down"
              ? `গতকালের তুলনায় আজ দাম কমেছে · ${formatNumber(priceDifference)} টাকা`
              : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

    const cheapest = product.markets.length
        ? product.markets.reduce((a, b) => (b.min < a.min ? b : a))
        : null;
    const priciest = product.markets.length
        ? product.markets.reduce((a, b) => (b.max > a.max ? b : a))
        : null;
    const averagePrice = product.markets.length
        ? product.markets.reduce(
              (total, market) => total + (market.min + market.max) / 2,
              0,
          ) / product.markets.length
        : product.today;

    const summary = [
        {
            label: "সর্বনিম্ন দাম",
            value: cheapest?.min ?? product.today,
            note: cheapest ? "সবচেয়ে কম দামের বাজার" : null,
            market: cheapest,
            tone: "text-up",
        },
        {
            label: "সর্বাধিক দাম",
            value: priciest?.max ?? product.today,
            note: priciest ? "সবচেয়ে বেশি দামের বাজার" : null,
            market: priciest,
            tone: "text-down",
        },
        {
            label: "গড় দাম",
            value: averagePrice,
            note: `প্রতি ${product.unit}-এর হিসাবে`,
            market: null,
            tone: "text-ink",
        },
    ];

    return (
        <div className="space-y-8">
            <nav aria-label="breadcrumb" className="text-sm text-muted">
                <Link href="/" className="hover:text-brand">
                    হোম
                </Link>
                <span className="mx-2">/</span>
                <Link
                    href={`/category/${product.category}`}
                    className="hover:text-brand"
                >
                    {product.categoryNameBn}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-ink">{product.nameBn}</span>
            </nav>

            <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                        <span
                            aria-hidden
                            className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-4xl sm:size-20 sm:text-5xl"
                        >
                            {product.image}
                        </span>
                        <div>
                            <h1 className="text-2xl font-bold sm:text-3xl">
                                {product.nameBn}
                            </h1>
                            <p className="mt-3 inline-flex rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand-dark">
                                প্রতি {product.unit}
                            </p>
                        </div>
                    </div>

                    <div className="sm:text-right">
                        <p className="text-4xl font-bold text-brand-dark">
                            {formatTaka(product.today)}
                            <span className="text-base font-medium text-muted">
                                {" "}
                                / {product.unit}
                            </span>
                        </p>
                        <div className="mt-2 flex items-center gap-2 sm:justify-end">
                            <ChangeBadge value={product.change.pct} />
                            <span className="text-sm text-muted">
                                {trendText}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    {summary.map((item) => (
                        <div
                            key={item.label}
                            className="rounded-2xl border border-line bg-white p-5"
                        >
                            <p className="text-sm text-muted">{item.label}</p>
                            <p
                                className={`mt-1 text-2xl font-bold ${item.tone}`}
                            >
                                {formatTaka(item.value)}
                            </p>
                            {item.note && (
                                <p className="mt-2 text-xs text-muted">
                                    {item.note}
                                </p>
                            )}
                            {item.market && (
                                <p className="text-sm font-medium">
                                    {item.market.market}, {item.market.division}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="mb-4 text-xl font-bold">
                    বাজারভিত্তিক আজকের দাম
                </h2>
                {product.markets.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-line bg-white p-8 text-center text-muted">
                        এই পণ্যের বাজারভিত্তিক তথ্য এখনো পাওয়া যায়নি।
                    </p>
                ) : (
                    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
                        <table className="w-full min-w-[34rem] text-left text-sm sm:text-base">
                            <thead className="bg-brand-soft text-brand-dark">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">
                                        বাজার
                                    </th>
                                    <th className="px-4 py-3 font-semibold">
                                        বিভাগ
                                    </th>
                                    <th className="px-4 py-3 text-right font-semibold">
                                        সর্বনিম্ন
                                    </th>
                                    <th className="px-4 py-3 text-right font-semibold">
                                        সর্বাধিক
                                    </th>
                                    <th className="px-4 py-3 text-right font-semibold">
                                        গড়
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.markets.map((market, index) => (
                                    <tr
                                        key={`${market.market}-${index}`}
                                        className="border-t border-line"
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {market.market}
                                        </td>
                                        <td className="px-4 py-3 text-muted">
                                            {market.division}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {formatTaka(market.min)}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {formatTaka(market.max)}
                                        </td>
                                        <td className="px-4 py-3 text-right font-semibold">
                                            {formatTaka(
                                                (market.min + market.max) / 2,
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <p className="mt-3 text-xs text-muted">
                    মোট {toBn(product.markets.length)}টি বাজারের তথ্য
                </p>
            </section>
        </div>
    );
}
