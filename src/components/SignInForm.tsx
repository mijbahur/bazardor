"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GoogleIcon from "./GoogleIcon";
import { authClient } from "@/lib/auth-client";
import GithubIcon from "./GithubIcon";

export default function SignInForm() {
    const router = useRouter();
    const params = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        if (params.get("reason") === "protected") {
            toast.error("এই পেজ দেখতে আগে সাইন ইন করতে হবে।", {
                id: "protected",
            });
            router.replace("/signin");
        }
    }, [params, router]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const form = new FormData(e.currentTarget);
        const email = String(form.get("email") ?? "").trim();
        const password = String(form.get("password") ?? "");

        if (!email || !password) {
            const msg = "ইমেইল ও পাসওয়ার্ড দিন।";
            setError(msg);
            toast.error(msg);
            return;
        }

        setLoading(true);
        const { error } = await authClient.signIn.email({ email, password });
        setLoading(false);

        if (error) {
            const msg = "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
            setError(msg);
            toast.error(msg);
            return;
        }

        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
        router.refresh();
    };

    const onGoogle = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
        if (error) toast.error("Google দিয়ে সাইন ইন করা যায়নি।");
    };
    const onGithub = async () => {
        const { error } = await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
        });
        if (error) toast.error("GitHub দিয়ে সাইন ইন করা যায়নি।");
    };

    return (
        <>
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <label className="block">
                    <span className="mb-1 block text-sm font-medium">
                        ইমেইল
                    </span>
                    <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="input w-full rounded-xl border-line bg-white"
                    />
                </label>
                <label className="block">
                    <span className="mb-1 block text-sm font-medium">
                        পাসওয়ার্ড
                    </span>
                    <input
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                        className="input w-full rounded-xl border-line bg-white"
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
                        "সাইন ইন"
                    )}
                </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-sm text-muted">
                <span className="h-px flex-1 bg-line" />
                অথবা
                <span className="h-px flex-1 bg-line" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                    onClick={onGoogle}
                    className="btn rounded-xl border-line bg-white font-medium text-ink hover:border-brand"
                >
                    <GoogleIcon /> Google
                </button>
                <button
                    onClick={onGithub}
                    className="btn rounded-xl border-line bg-white font-medium text-ink hover:border-brand"
                >
                    <GithubIcon /> GitHub
                </button>
            </div>
            {/* <button
                onClick={onGoogle}
                className="btn w-full rounded-xl border-line bg-white font-medium text-ink hover:border-brand"
            >
                <GoogleIcon /> Google দিয়ে চালিয়ে যান
            </button> */}

            <p className="mt-6 text-center text-sm">
                অ্যাকাউন্ট নেই?{" "}
                <Link
                    href="/signup"
                    className="font-semibold text-brand hover:underline"
                >
                    সাইন আপ করুন
                </Link>
            </p>
        </>
    );
}
