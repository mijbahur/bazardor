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
                className="btn btn-sm sm:btn-md rounded-full border-0 bg-brand font-semibold text-white hover:bg-brand-dark"
            >
                সাইন আপ
            </Link>
        </div>
    );
}
