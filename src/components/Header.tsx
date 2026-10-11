import Link from "next/link";
import AuthButtons from "./AuthButtons";
import NavLinks from "./NavLinks";
import { NavLinksSkeleton } from "./Skeletons";
import { connection } from "next/server";
import { Suspense } from "react";

async function HeaderDate() {
    await connection();
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <span className="block min-h-4 text-[11px] text-muted sm:text-x">
            {date}
        </span>
    );
}

export default function Header() {
    return (
        <header className="border-b border-line bg-white">
            <div className="mx-auto max-w-6xl px-4 pt-3 pb-2">
                <div className="flex items-center justify-between gap-3">
                    <Link href="/" className="flex items-center gap-2.5">
                        <span
                            aria-hidden
                            className="flex size-10 items-center justify-center rounded-xl bg-brand text-xl"
                        >
                            🛒
                        </span>
                        <span className="leading-tight">
                            <span className="block text-xl font-bold text-brand-dark sm:text-2xl">
                                বাজার দর
                            </span>
                            <Suspense
                                fallback={
                                    <span
                                        aria-hidden
                                        className="block min-h-4 text-[11px] text-muted sm:text-x"
                                    />
                                }
                            >
                                <HeaderDate />
                            </Suspense>
                        </span>
                    </Link>
                    <AuthButtons />
                </div>
                <div className="mt-3">
                    <Suspense fallback={<NavLinksSkeleton />}>
                        <NavLinks />
                    </Suspense>
                </div>
            </div>
        </header>
    );
}
