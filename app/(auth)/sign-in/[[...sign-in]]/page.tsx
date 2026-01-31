import { SignIn } from "@clerk/nextjs";
import { JSX } from "react";

export default function Page(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn afterSignInUrl="/dashboard" />
    </div>
  );
}
