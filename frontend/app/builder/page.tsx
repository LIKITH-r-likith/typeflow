import {
  BuilderSidebar,
  BuilderToolbar,
  QuestionCanvas,
  QuestionProperties,
  LivePreview,
} from "@/components/builder";

import { BackgroundBlobs } from "@/components/ui/background-blobs";

export default function BuilderPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#f6f7fb]">

      {/* Animated Background */}
      <BackgroundBlobs />

      {/* Sidebar */}
      <aside className="relative z-20">
        <BuilderSidebar />
      </aside>

      {/* Main Area */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">

        {/* Toolbar */}
        <BuilderToolbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">

          <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-8 px-8 py-8">

            {/* Canvas + Preview */}
            <section className="grid gap-8 xl:grid-cols-[1.65fr_0.85fr]">

              {/* Builder Canvas */}
              <div className="glass rounded-[30px] p-8">
                <QuestionCanvas />
              </div>

              {/* Live Preview */}
              <div className="glass sticky top-28 h-fit rounded-[30px] p-6">
                <LivePreview />
              </div>

            </section>

            {/* Properties */}
            <section className="glass rounded-[30px] p-8">
              <QuestionProperties />
            </section>

          </div>

        </main>

      </div>

    </div>
  );
}