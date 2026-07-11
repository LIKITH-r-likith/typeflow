"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";

import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { FloatingParticles } from "@/components/ui/floating-particles";

import { FormsTable } from "@/components/forms/forms-table";

export default function FormsPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#f6f7fb]">

      {/* Animated Background */}
      <BackgroundBlobs />
      <FloatingParticles />

      {/* Sidebar */}
      <aside className="relative z-20">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 flex-col">

        <Navbar />

        <main className="mx-auto w-full max-w-[1600px] flex-1 px-8 py-8">

          <div className="glass rounded-[34px] p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-500">
                  Dashboard
                </p>

                <h1 className="mt-2 text-4xl font-bold text-gray-900">
                  My Forms
                </h1>

                <p className="mt-2 max-w-2xl text-gray-500">
                  Manage, edit, organize and monitor every form you've
                  created from one place.
                </p>

              </div>

              <a
                href="/builder"
                className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-violet-500/30"
              >
                + New Form
              </a>

            </div>

            {/* Forms Table */}
            <FormsTable />

          </div>

        </main>

      </div>

    </div>
  );
}