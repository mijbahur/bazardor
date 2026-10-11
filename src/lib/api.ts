import { Category, Product } from "./types";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error(`Failed to load categories: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error(`Failed to load Products: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.category === slug);
}

export const topRisers = (products: Product[], n = 6) =>
  products
    .filter((product) => product.change.dir === "up" && product.change.pct > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);
export const topFallers = (products: Product[], n = 6) =>
  products
    .filter((product) => product.change.dir === "down" && product.change.pct < 0)
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, n);
