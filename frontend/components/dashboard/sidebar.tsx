"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PenSquare,
  BarChart3,
  Settings,
  Sparkles,
  Lock,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    enabled: true,
  },
  {
    label: "My Forms",
    href: "/forms",
    icon: FileText,
    enabled: true,
  },
  {
    label: "Builder",
    href: "/builder",
    icon: PenSquare,
    enabled: true,
  },
  {
    label: "Analytics",
    href: "#",
    icon: BarChart3,
    enabled: false,
  },
  {
    label: "Settings",
    href: "#",
    icon: Settings,
    enabled: false,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-72 shrink-0 flex-col border-r border-white/40 bg-white/65 backdrop-blur-2xl">

      {/* Logo */}
      <div className="px-6 pt-8">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              TypeFlow
            </h1>

            <p className="text-xs text-gray-500">
              AI Form Builder
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="mt-10 flex flex-1 flex-col gap-2 px-4">

        {navItems.map((item) => {
          const Icon = item.icon;

          if (!item.enabled) {
            return (
              <div
                key={item.label}
                className="flex cursor-not-allowed items-center justify-between rounded-2xl px-4 py-3 text-gray-400 opacity-60"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>

                <Lock className="h-4 w-4" />
              </div>
            );
          }

          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300",
                active
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25"
                  : "text-gray-600 hover:bg-violet-50 hover:text-violet-700"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  active && "scale-110"
                )}
              />

              <span>{item.label}</span>
            </Link>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-white/40 p-6">

        <div className="rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-600 p-5 text-white shadow-xl shadow-violet-500/20">

          <h3 className="font-semibold">
            TypeFlow AI
          </h3>

          <p className="mt-2 text-sm leading-6 text-violet-100">
            Beautiful forms.
            <br />
            AI powered.
          </p>

        </div>

      </div>

    </aside>
  );
}