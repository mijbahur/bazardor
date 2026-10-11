import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const hind = Hind_Siliguri({
    subsets: ["latin", "bengali"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-hind",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
        template: "%s | বাজার দর",
    },
    description:
        "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর, বাজারভিত্তিক তুলনা এবং দামের পরিবর্তন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="bn"
            data-theme="light"
            className={`${hind.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col bg-white text-neutral-900 [color-scheme:light]">
                <Header />
                <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
                    {children}
                </main>
            </body>
        </html>
    );
}
