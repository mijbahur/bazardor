"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpCompletePage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let active = true;

        const finishSignUp = async () => {
            const { error: signOutError } = await authClient.signOut();

            if (!active) return;

            if (signOutError) {
                setError(
                    "অ্যাকাউন্ট তৈরি হয়েছে, কিন্তু সাইন আউট করা যায়নি। আবার চেষ্টা করুন।",
                );
                return;
            }

            toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
            router.replace("/signin");
            router.refresh();
        };

        void finishSignUp();

        return () => {
            active = false;
        };
    }, [attempt, router]);

    if (error) {
        return (
            <div className="mx-auto max-w-md rounded-3xl border border-line bg-white p-6 text-center">
                <p role="alert" className="text-down">
                    {error}
                </p>
                <button
                    onClick={() => {
                        setError("");
                        setAttempt((current) => current + 1);
                    }}
                    className="btn mt-4 rounded-xl border-0 bg-brand font-semibold text-white hover:bg-brand-dark"
                >
                    আবার চেষ্টা করুন
                </button>
            </div>
        );
    }

    return (
        <div
            className="flex min-h-48 items-center justify-center"
            role="status"
            aria-label="সাইন আউট করা হচ্ছে"
        >
            <span className="loading loading-spinner loading-lg text-brand" />
        </div>
    );
}
