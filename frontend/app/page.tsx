import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";
import { Hero } from "@/components/dashboard/hero";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentForms } from "@/components/dashboard/recent-forms";
import { QuickActions } from "@/components/dashboard/quick-actions";

import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { FloatingParticles } from "@/components/ui/floating-particles";

export default function DashboardPage() {
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

        <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-8 px-8 py-8">

          {/* Hero */}
          <section className="glass glow overflow-hidden rounded-[30px] p-1">
            <Hero />
          </section>

          {/* Stats */}
          <section>
            <StatsCards />
          </section>

          {/* Main Grid */}
          <section className="grid grid-cols-1 gap-8 xl:grid-cols-3">

            {/* Recent Forms */}
            <div className="glass rounded-[30px] p-6 xl:col-span-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)]">
              <RecentForms />
            </div>

            {/* Quick Actions */}
            <div className="glass rounded-[30px] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)]">
              <QuickActions />
            </div>

          </section>

        </main>

      </div>
    </div>
  );
}