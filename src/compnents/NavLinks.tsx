import type { Category } from "@/lib/types";
import NavLinksClient from "./NavLinksClient";
import { getCategories } from "@/lib/api";

const NavLinks = async () => {
    // const res = await fetch(
    //     "https://openapi.programming-hero.com/api/bazardor/categories",
    // );
    // if (!res.ok) {
    //     throw new Error(`Failed to load categories: ${res.status}`);
    // }

    // const data: Category[] = await res.json();
    const data = await getCategories();

    return <NavLinksClient categories={data} />;
};

export default NavLinks;
