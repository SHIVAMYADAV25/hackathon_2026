"use client";

import Link from "next/link";
import { useState, useEffect, JSX, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Shield, Users, Radio } from "lucide-react";
import { UserMode } from "@/context/ModeContext";

export default function LandingPage(): JSX.Element {
  
  const {dark, setDark} = useContext(UserMode);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors">

      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Shield className="w-5 h-5" />
          WatchmyCampus
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-600 dark:text-neutral-400">
          <a href="#">Our Mission</a>
          <a href="#">Resources</a>
          <a href="#">Community</a>
        </div>

        <div className="flex items-center gap-4">
          {/* Dark mode toggle */}
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4" />
            <Switch checked={dark} onCheckedChange={setDark} />
            <Moon className="w-4 h-4" />
          </div>

          {/* Login button */}
          <Link href="/sign-in">
            <Button className="rounded-full px-5">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="text-center mt-24 px-6">
        <h1 className="text-5xl font-bold leading-tight">
          Watching over{" "}
          <span className="text-neutral-400 italic">each other.</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
          A community-led space where safety isn’t just a system,
          it’s a shared commitment to looking out for one another.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/sign-up">
            <Button size="lg">Get Started</Button>
          </Link>

          <Link href="/sign-in">
            <Button size="lg" variant="outline">
              Enter Hub
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= ROLE CARDS ================= */}
      <section className="mt-20 flex flex-col gap-8 items-center px-6">

        {/* Admin */}
        <div className="w-full max-w-xl bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-neutral-200 dark:bg-neutral-800 rounded-full">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Main Guard</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Coordinate safety efforts and manage campus-wide monitoring.
              </p>

              <Link
                href="/sign-in"
                className="mt-4 inline-block text-sm font-medium text-blue-500 hover:underline"
              >
                Access Dashboard →
              </Link>
            </div>
          </div>
        </div>

        {/* Guard */}
        <div className="w-full max-w-xl bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-neutral-200 dark:bg-neutral-800 rounded-full">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Field Guard</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Active responders monitoring and resolving alerts on the ground.
              </p>

              <Link
                href="/sign-in"
                className="mt-4 inline-block text-sm font-medium text-blue-500 hover:underline"
              >
                Open Guard Radio →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center px-10 pb-24">

        <div>
          <Shield className="mx-auto mb-3" />
          <h4 className="font-medium">Human Centered</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Prioritizing people’s safety over protocols.
          </p>
        </div>

        <div>
          <Users className="mx-auto mb-3" />
          <h4 className="font-medium">Transparent</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Open records, open community trust.
          </p>
        </div>

        <div>
          <Radio className="mx-auto mb-3" />
          <h4 className="font-medium">Always Here</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Supported by peers, 24/7/365.
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 px-8 flex justify-between text-sm text-neutral-500">
        <p>© 2024 WatchmyCampus</p>
        <div className="flex gap-6">
          <a href="#">Trust</a>
          <a href="#">Accessibility</a>
          <a href="#">Volunteer</a>
        </div>
      </footer>
    </div>
  );
}
