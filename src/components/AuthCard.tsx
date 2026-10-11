import Link from "next/link";

export default function AuthCard({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 text-center">
                    <span
                        aria-hidden
                        className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand text-2xl"
                    >
                        🛒
                    </span>
                    <h1 className="mt-3 text-2xl font-bold">{title}</h1>
                    <p className="mt-1 text-sm text-muted">{subtitle}</p>
                </div>
                {children}
            </div>
            <p className="mt-5 text-center text-sm">
                <Link href="/" className="text-muted hover:text-brand">
                    ← হোম পেজে ফিরে যান
                </Link>
            </p>
        </div>
    );
}
