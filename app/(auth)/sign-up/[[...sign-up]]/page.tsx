import { SignUp } from "@clerk/nextjs";
import { JSX } from "react";

export default function Page(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        afterSignUpUrl="/dashboard"
        afterSignInUrl="/dashboard"
      />
    </div>
  );
}
