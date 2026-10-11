"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuthButtons() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [failedImage, setFailedImage] = useState<string | null>(null);

    const handleSignOut = async () => {
        const { error } = await authClient.signOut();
        if (error) {
            toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
            return;
        }
        toast.success("সফলভাবে সাইন আউট হয়েছে।");
        router.push("/");
        router.refresh();
    };

    if (isPending) {
        return (
            <div className="skeleton-box h-9 w-40 !rounded-full" aria-hidden />
        );
    }
    if (user) {
        const imageUrl = user.image;
        const initial = (user.name || user.email || "?")
            .trim()
            .charAt(0)
            .toUpperCase();
        return (
            <div className="flex items-center gap-2">
                <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-full border border-line bg-white py-1 pr-3 pl-1 text-sm font-medium hover:border-brand"
                    title="আমার প্রোফাইল"
                >
                    {imageUrl && failedImage !== imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt=""
                            width={28}
                            height={28}
                            className="size-7 rounded-full object-cover"
                            onError={() => setFailedImage(imageUrl)}
                        />
                    ) : (
                        <span className="flex size-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                            {initial}
                        </span>
                    )}
                    <span className="hidden max-w-28 truncate sm:inline">
                        {user.name}
                    </span>
                </Link>
                <button
                    onClick={handleSignOut}
                    className="btn btn-sm sm:btn-md rounded-full border-line bg-white font-medium text-ink hover:border-down hover:text-down"
                >
                    সাইন আউট
                </button>
            </div>
        );
    }
    return (
        <div className="flex items-center gap-2">
            <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-brand-soft sm:text-base"
            >
                সাইন ইন
            </Link>
            <Link
                href="/signup"
                className="btn btn-sm sm:btn-md rounded-full border-0 bg-brand font-semibold text-white hover:bg-brand-dark"
            >
                সাইন আপ
            </Link>
        </div>
    );
}
