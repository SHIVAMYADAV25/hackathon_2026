"use client";

import { SignOutButton } from "@clerk/nextjs";
import { JSX } from "react";

export default function LogoutButton(): JSX.Element {
  return (
    <SignOutButton redirectUrl="/">
      <button className="rounded bg-red-500 px-4 py-2 text-white">
        Logout
      </button>
    </SignOutButton>
  );
}
