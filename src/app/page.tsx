import Hero from "@/compnents/Hero";
import ProductSection from "@/compnents/ProductSection";
import { getProducts, topFallers, topRisers } from "@/lib/api";
import { Suspense } from "react";
// import { Suspense } from "react";

const products = await getProducts();


function ProductsFallback() {
  return (
    <section aria-busy="true" aria-label="পণ্য লোড হচ্ছে">
      <div
        aria-hidden="true"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl border border-line bg-sage"
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  // const products = await getProducts();
  return (
    <div className="space-y-12">
      <Hero />
      <Suspense fallback={<ProductsFallback />}>
          <ProductSection title="আজ দাম বেড়েছে ▲" tone="up" products={topRisers(products)} />       
          <ProductSection title="আজ দাম কমেছে ▼" tone="down" products={topFallers(products)} />
      </Suspense>
    </div>
  );
}
