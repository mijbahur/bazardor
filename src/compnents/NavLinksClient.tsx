"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

type NavLinksClientProps = {
    categories: Category[];
};

const NavLinksClient = ({ categories }: NavLinksClientProps) => {
    const pathname = usePathname();

    const link = (href: string, label: string) => {
        const active =
            pathname === href ||
            (href !== "/" && pathname.startsWith(`${href}/`));

        return (
            <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition sm:text-base ${
                    active
                        ? "bg-brand text-white shadow-sm"
                        : "text-ink hover:bg-brand-soft hover:text-brand-dark"
                }`}
            >
                {label}
            </Link>
        );
    };

    return (
        <nav
            aria-label="পণ্যের বিভাগ"
            className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:justify-center sm:px-0"
        >
            {link("/", "হোম")}
            {categories.map((category) =>
                link(`/category/${category.slug}`, category.nameBn),
            )}
        </nav>
    );
};

export default NavLinksClient;
