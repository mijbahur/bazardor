"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

type NavLinksClientProps = {
    categories: Category[];
};

const NavLinksClient = ({ categories }: NavLinksClientProps) => {
    const pathname = usePathname();

    const link = (href: string, label: string, icon: string) => {
        const active =
            pathname === href ||
            (href !== "/" && pathname.startsWith(`${href}/`));

        return (
            <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors sm:text-base ${
                    active
                        ? "border-brand bg-brand text-white shadow-sm"
                        : "border-line bg-white text-ink hover:border-brand hover:bg-brand-soft hover:text-brand-dark"
                }`}
            >
                <span aria-hidden="true">{icon}</span>
                {label}
            </Link>
        );
    };

    return (
        <nav
            aria-label="পণ্যের বিভাগ"
            className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:justify-center sm:px-0"
        >
            {link("/", "হোম", "🏠")}
            {categories.map((category) =>
                link(
                    `/category/${category.slug}`,
                    category.nameBn,
                    category.icon,
                ),
            )}
        </nav>
    );
};

export default NavLinksClient;
