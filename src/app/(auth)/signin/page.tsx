import type { Metadata } from "next";
import { Suspense } from "react";
import AuthCard from "@/components/AuthCard";
import SignInForm from "@/components/SignInForm";

export const metadata: Metadata = { title: "সাইন ইন" };

export default function SignInPage() {
    return (
        <AuthCard
            title="সাইন ইন"
            subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
        >
            <Suspense fallback={<div className="skeleton-box h-64 w-full" />}>
                <SignInForm />
            </Suspense>
        </AuthCard>
    );
}
