import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function ProductSection({
    title,
    tone,
    products,
}: {
    title: string;
    tone: "up" | "down";
    products: Product[];
}) {
    if (!products.length) return null;
    return (
        <section>
            <h2
                className={`mb-4 border-l-4 pl-3 text-xl font-bold ${
                    tone === "up"
                        ? "border-up text-up"
                        : "border-down text-down"
                }`}
            >
                {title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}
