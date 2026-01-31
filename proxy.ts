import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",                 // landing page
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(
  (auth, req: NextRequest) => {
    if (isPublicRoute(req)) {
      return NextResponse.next();
    }

    // 🔒 PROTECT EVERYTHING ELSE (INCLUDING /dashboard)
    auth.protect();
    return NextResponse.next();
  }
);

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
