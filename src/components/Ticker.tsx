import { Suspense } from "react";
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { formatTaka, formatPercent, toBn } from "@/lib/bangla";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

function Item({ p }: { p: Product }) {
    const color =
        p?.change?.pct > 0
            ? "text-green-300"
            : p?.change?.pct < 0
              ? "text-red-300"
              : "text-white/70";
    const arrow = p?.change?.pct > 0 ? "▲" : p?.change?.pct < 0 ? "▼" : "—";
    return (
        <span className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-sm">
            <span aria-hidden>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span>
                {formatTaka(p.today)}/{p.unit}
            </span>
            <span className={`font-semibold ${color}`}>
                {arrow}{" "}
                {p?.change?.pct === 0
                    ? `${toBn("0.0")}%`
                    : formatPercent(p?.change?.pct)}
            </span>
        </span>
    );
}

async function TickerContent() {
    const products = await getProducts();
    return (
        <div
            className="overflow-hidden bg-brand-dark text-white"
            role="marquee"
            aria-label="আজকের দামের তালিকা"
        >
            <MarqueeText
                className="py-2"
                direction="right"
                duration={10}
                pauseOnHover
            >
                {products.map((product) => (
                    <Link
                        className="hover:underline"
                        href={`/product/${product.slug}`}
                        key={product.id}
                    >
                        <Item p={product} />
                    </Link>
                ))}
            </MarqueeText>
        </div>
    );
}

export default function Ticker() {
    return (
        <Suspense
            fallback={
                <div
                    aria-hidden="true"
                    className="min-h-9 bg-brand-dark"
                />
            }
        >
            <TickerContent />
        </Suspense>
    );
}
