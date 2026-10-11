"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import GoogleIcon from "./GoogleIcon";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fail = (msg: string) => {
        setError(msg);
        toast.error(msg);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const form = new FormData(e.currentTarget);
        const name = String(form.get("name") ?? "").trim();
        const email = String(form.get("email") ?? "").trim();
        const password = String(form.get("password") ?? "");
        const confirm = String(form.get("confirm") ?? "");

        if (!name || !email || !password) return fail("সবগুলো ঘর পূরণ করুন।");
        if (password.length < 8)
            return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
        if (password !== confirm) return fail("দুটি পাসওয়ার্ড মিলছে না।");

        setLoading(true);
        const { error: signUpError } = await authClient.signUp.email({
            name,
            email,
            password,
        });
        setLoading(false);

        if (signUpError) {
            return fail(
                signUpError.code === "USER_ALREADY_EXISTS" ||
                    signUpError.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
                    ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।"
                    : signUpError.message || "অ্যাকাউন্ট তৈরি করা যায়নি।",
            );
        }

        toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
        router.push("/signin");
    };

    const onGoogle = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
        if (error) toast.error("Google দিয়ে সাইন আপ করা যায়নি।");
    };

    const inputCls = "input w-full rounded-xl border-line bg-white";

    return (
        <>
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <label className="block">
                    <span className="mb-1 block text-sm font-medium">নাম</span>
                    <input
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="যেমন: রহিম উদ্দিন"
                        className={inputCls}
                    />
                </label>
                <label className="block">
                    <span className="mb-1 block text-sm font-medium">
                        ইমেইল
                    </span>
                    <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={inputCls}
                    />
                </label>
                <label className="block">
                    <span className="mb-1 block text-sm font-medium">
                        পাসওয়ার্ড
                    </span>
                    <input
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                        className={inputCls}
                    />
                </label>
                <label className="block">
                    <span className="mb-1 block text-sm font-medium">
                        পাসওয়ার্ড নিশ্চিত করুন
                    </span>
                    <input
                        name="confirm"
                        type="password"
                        autoComplete="new-password"
                        placeholder="আবার লিখুন"
                        className={inputCls}
                    />
                </label>

                {error && (
                    <p
                        role="alert"
                        className="rounded-lg bg-red-50 px-3 py-2 text-sm text-down"
                    >
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="btn w-full rounded-xl border-0 bg-brand font-semibold text-white hover:bg-brand-dark"
                >
                    {loading ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : (
                        "অ্যাকাউন্ট তৈরি করুন"
                    )}
                </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-sm text-muted">
                <span className="h-px flex-1 bg-line" />
                অথবা
                <span className="h-px flex-1 bg-line" />
            </div>

            <button
                onClick={onGoogle}
                className="btn w-full rounded-xl border-line bg-white font-medium text-ink hover:border-brand"
            >
                <GoogleIcon /> Google দিয়ে চালিয়ে যান
            </button>

            <p className="mt-6 text-center text-sm">
                অ্যাকাউন্ট আছে?{" "}
                <Link
                    href="/signin"
                    className="font-semibold text-brand hover:underline"
                >
                    সাইন ইন করুন
                </Link>
            </p>
        </>
    );
}
