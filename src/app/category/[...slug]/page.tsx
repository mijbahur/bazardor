import type { Metadata } from "next";
import { notFound } from "next/navigation";
// import NotFoundView from "@/components/NotFoundView";
import SortableProducts from "@/components/SortableProducts";
import { getCategory, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/bangla";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(decodeURIComponent(slug));
  return { title: category?.nameBn ?? "বিভাগ পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: Params) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
  ]);

  // invalid slug -> real 404 (app/not-found.tsx)
  if (!category) notFound();

  // valid category without any item -> friendly empty state
  // if (products.length === 0) {
  //   return <NotFoundView message="এই বিভাগে এখনো কোনো পণ্য নেই।" />;
  // }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3 border-b border-line pb-4">
        <span
          aria-hidden
          className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-3xl"
        >
          {category.icon || products[0]?.image || "🛒"}
        </span>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{category.nameBn}</h1>
          <p className="text-sm text-muted">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>
      <SortableProducts products={products} />
    </div>
  );
}
