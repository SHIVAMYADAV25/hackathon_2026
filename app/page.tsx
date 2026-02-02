"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Moon,
  Sun,
  Shield,
  Users,
  Radio,
  Camera,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { UserMode } from "@/context/ModeContext";

export default function LandingPage() {
  const { dark, setDark } = useContext(UserMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors">

      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Shield className="w-5 h-5 text-blue-500" />
          WatchmyCampus
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4" />
            <Switch checked={dark} onCheckedChange={setDark} />
            <Moon className="w-4 h-4" />
          </div>

          <Link href="/sign-in">
            <Button size="sm">Login</Button>
          </Link>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto mt-20 px-6 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Campus safety,
            <span className="text-blue-500"> clearly managed.</span>
          </h1>

          <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
            WatchmyCampus helps colleges monitor security alerts, assign guards,
            and resolve incidents with complete visibility and accountability.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/sign-up">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
          <img
            src="https://s.abcnews.com/images/WNT/230515_wn_ender_hpMain_16x9_1600.jpg"
            alt="Campus security monitoring"
            className="w-full h-full object-cover"
          />

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="mt-28 max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center mb-14">
          How WatchmyCampus works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <Step
            icon={<Camera />}
            title="Monitor"
            desc="Cameras and sensors track activity across campus in real time."
            image="https://images.unsplash.com/photo-1563206767-5b18f218e8de"
          />
          <Step
            icon={<AlertTriangle />}
            title="Respond"
            desc="Security alerts are reviewed and assigned to field guards."
            image="https://media.istockphoto.com/id/591417990/photo/male-operator-sleeping-at-security-monitors-desk.jpg?s=612x612&w=0&k=20&c=XMRKuU2DLjfRbxlzGxbaTpc58RGX5fiXQF-_iBO2lGk="
          />
          <Step
            icon={<CheckCircle2 />}
            title="Resolve"
            desc="Incidents are handled, resolved, and logged transparently."
            image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
          />
        </div>
      </section>

      {/* ================= ROLES ================= */}
      <section className="mt-28 max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center mb-14">
          Built for real security roles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <RoleCard
            icon={<Users />}
            title="Main Guard"
            desc="Oversees campus-wide alerts, assigns field guards, and tracks resolution status."
            image="https://s.alicdn.com/@sc04/kf/He67c7a46782d48ff8d5e2ef0d305cd07i/Cosplay-Erotic-Lingerie-Sexy-Police-Uniform-Temptation-See-Through-Ladies-Lingerie-Set.jpg"
          />
          <RoleCard
            icon={<Radio />}
            title="Field Guard"
            desc="Receives alerts, responds on-site, updates progress, and resolves incidents."
            image="https://images-na.ssl-images-amazon.com/images/I/71gZRTHtN1L._AC_UL750_SR750,750_.jpg"
          />
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="mt-28 bg-neutral-50 dark:bg-neutral-900/50 py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <Value icon={<Shield />} title="Reliable">
            Designed for daily campus operations.
          </Value>
          <Value icon={<Users />} title="Human-first">
            Built around people, not just systems.
          </Value>
          <Value icon={<Radio />} title="Always active">
            Supports continuous security monitoring.
          </Value>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 px-8 text-sm text-neutral-500 flex justify-between">
        <p>© 2024 WatchmyCampus</p>
        <div className="flex gap-6">
          <a href="#">Privacy</a>
          <a href="#">Accessibility</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Step({ icon, title, desc, image }: any) {
  return (
    <div>
      <div className="rounded-xl overflow-hidden mb-4 border border-neutral-200 dark:border-neutral-800">
        <img src={image} alt={title} width={400} height={260} className="object-cover" />
      </div>
      <div className="flex justify-center mb-3 text-blue-500">{icon}</div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
        {desc}
      </p>
    </div>
  );
}

function RoleCard({ icon, title, desc, image }: any) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition">
      <img src={image} alt={title} width={600} height={350} className="object-cover" />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800">
            {icon}
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {desc}
        </p>
        <Link
          href="/sign-in"
          className="inline-block mt-4 text-sm text-blue-500 hover:underline"
        >
          Open Interface →
        </Link>
      </div>
    </div>
  );
}

function Value({ icon, title, children }: any) {
  return (
    <div>
      <div className="mx-auto mb-3 w-fit p-3 rounded-xl bg-neutral-200 dark:bg-neutral-800">
        {icon}
      </div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
        {children}
      </p>
    </div>
  );
}
