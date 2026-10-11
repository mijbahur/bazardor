import Link from "next/link";

export default function NotFoundView({
    message = "আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি।",
}: {
    message?: string;
}) {
    return (
        <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
            <p className="text-8xl font-black text-brand sm:text-9xl">৪০৪</p>
            <p className="mt-2 text-4xl" aria-hidden>
                🧺
            </p>
            <h1 className="mt-4 text-2xl font-bold">পেজটি পাওয়া যায়নি</h1>
            <p className="mt-2 text-muted">{message}</p>
            <Link
                href="/"
                className="btn mt-6 rounded-full border-0 bg-brand px-6 font-semibold text-white hover:bg-brand-dark"
            >
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}
