"use client";

import Link from "next/link";

export default function AuthButtons() {
    return (
        <div className="flex items-center gap-2">
            <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-brand-soft sm:text-base"
            >
                সাইন ইন
            </Link>
            <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-base"
            >
                সাইন আপ
            </Link>
        </div>
    );
}
