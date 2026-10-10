import Image from "next/image";

export default function Hero() {
    return (
        <section className="overflow-hidden rounded-3xl border border-line bg-white">
            <div className="grid items-center gap-6 p-6 sm:p-10 md:grid-cols-[1.3fr_1fr]">
                <div>
                    <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand-dark">
                        ⚖️ বাজার তুলনা
                    </span>
                    <h1 className="mt-4 text-3xl leading-snug font-bold text-ink sm:text-4xl lg:text-5xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>
                    <p className="mt-3 max-w-xl text-base text-muted sm:text-lg">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <a
                            href="#সব-পণ্য"
                            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-base"
                        >
                            সব পণ্য দেখুন
                        </a>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Image
                        src="/bazar-hero.png"
                        alt="ফল ও সবজির ঝুড়ি"
                        width={315}
                        height={263}
                        priority
                        className="h-auto w-56 sm:w-72"
                    />
                </div>
            </div>
        </section>
    );
}
