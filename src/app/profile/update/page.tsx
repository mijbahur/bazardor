"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = String(
            new FormData(e.currentTarget).get("name") ?? "",
        ).trim();

        if (name.length < 2) return toast.error("সঠিক নাম লিখুন।");

        setLoading(true);
        const { error } = await authClient.updateUser({ name });
        setLoading(false);

        if (error)
            return toast.error(error.message || "তথ্য আপডেট করা যায়নি।");

        toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
        router.push("/profile");
        router.refresh();
    };

    return (
        <div className="mx-auto max-w-md">
            <h1 className="text-2xl font-bold sm:text-3xl">তথ্য আপডেট</h1>
            <p className="mt-1 mb-6 text-sm text-muted">
                আপনার প্রোফাইলের নাম পরিবর্তন করুন।
            </p>

            {isPending ? (
                <div className="skeleton-box h-48 w-full !rounded-3xl" />
            ) : (
                <form
                    onSubmit={onSubmit}
                    className="space-y-4 rounded-3xl border border-line bg-white p-6 sm:p-8"
                >
                    <label className="block">
                        <span className="mb-1 block text-sm font-medium">
                            নাম
                        </span>
                        <input
                            name="name"
                            type="text"
                            defaultValue={session?.user.name ?? ""}
                            placeholder="আপনার নাম"
                            className="input w-full rounded-xl border-line bg-white"
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn w-full rounded-xl border-0 bg-brand font-semibold text-white hover:bg-brand-dark"
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            "তথ্য আপডেট করুন"
                        )}
                    </button>
                    <Link
                        href="/profile"
                        className="block text-center text-sm text-muted hover:text-brand"
                    >
                        ← প্রোফাইলে ফিরে যান
                    </Link>
                </form>
            )}
        </div>
    );
}
