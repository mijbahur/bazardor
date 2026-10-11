import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { PageSkeleton } from "@/components/Skeletons";
import SortableProducts from "@/components/SortableProducts";
import { getCategories, getProducts, topFallers, topRisers } from "@/lib/api";
import { Suspense } from "react";
// import { Suspense } from "react";

const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
]);

export default function Home() {
    // const products = await getProducts();
    return (
        <div className="space-y-12">
            <Hero />
            <Suspense fallback={<PageSkeleton />}>
                <ProductSection
                    title="আজ দাম বেড়েছে ▲"
                    tone="up"
                    products={topRisers(products)}
                />
                <ProductSection
                    title="আজ দাম কমেছে ▼"
                    tone="down"
                    products={topFallers(products)}
                />
                <section id="সব-পণ্য">
                    <h2 className="text-2xl font-bold">সব পণ্য</h2>
                    <p className="mt-1 mb-5 text-muted">
                        আজকের বাজারের সব নিত্যদিনের পণ্যের দাম ও পরিবর্তন।
                    </p>
                    <SortableProducts
                        products={products}
                        categories={categories}
                        withFilters
                    />
                </section>
            </Suspense>
        </div>
    );
}
