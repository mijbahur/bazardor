import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user
    if (!user) {
        const url = new URL("/signin", request.url);
        url.searchParams.set("reason", "protected");
        return NextResponse.redirect(url);
    }

}

export const config = {
    matcher: ["/product/:path*", "/profile/:path*"],
};
