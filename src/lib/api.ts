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
