"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { banglaDateTime } from "@/lib/bangla";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        const { error } = await authClient.signOut();
        if (error) return toast.error("সাইন আউট করা যায়নি।");
        toast.success("সফলভাবে সাইন আউট হয়েছে।");
        router.push("/");
        router.refresh();
    };

    if (isPending || !user) {
        return (
            <div className="mx-auto max-w-xl space-y-4">
                <div className="skeleton-box h-8 w-48" />
                <div className="skeleton-box h-64 w-full !rounded-3xl" />
            </div>
        );
    }

    const initial = (user.name || user.email).trim().charAt(0).toUpperCase();

    return (
        <div className="mx-auto max-w-xl">
            <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold sm:text-3xl">
                        আমার প্রোফাইল
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>
                <button
                    onClick={handleSignOut}
                    className="btn btn-sm sm:btn-md rounded-full border-line bg-white hover:border-down hover:text-down"
                >
                    ↩ সাইন আউট
                </button>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
                <div className="flex items-center gap-4">
                    {user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={user.image}
                            alt=""
                            className="size-16 rounded-full object-cover"
                        />
                    ) : (
                        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-2xl font-bold text-white">
                            {initial}
                        </span>
                    )}
                    <div className="min-w-0">
                        <p className="truncate text-xl font-semibold">
                            {user.name}
                        </p>
                        <p className="truncate text-sm text-muted">
                            {user.email}
                        </p>
                    </div>
                </div>

                <dl className="mt-6 divide-y divide-line text-sm sm:text-base">
                    <div className="flex justify-between gap-4 py-3">
                        <dt className="text-muted">নাম</dt>
                        <dd className="font-medium">{user.name}</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                        <dt className="text-muted">ইমেইল</dt>
                        <dd className="truncate font-medium">{user.email}</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                        <dt className="text-muted">সেশন শুরু</dt>
                        <dd className="text-right">
                            {banglaDateTime(
                                new Date(session.session.createdAt),
                            )}
                        </dd>
                    </div>
                </dl>

                <Link
                    href="/profile/update"
                    className="btn mt-6 w-full rounded-xl border-0 bg-brand font-semibold text-white hover:bg-brand-dark sm:w-auto"
                >
                    আপডেট
                </Link>
            </div>
        </div>
    );
}
