"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Copy,
  Eye,
  FileText,
} from "lucide-react";

import { getForms, FormApiResponse } from "@/services/forms";

export function FormsTable() {
  const [forms, setForms] = useState<FormApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadForms();
  }, []);

  async function loadForms() {
    try {
      const data = await getForms();
      setForms(data);
    } finally {
      setLoading(false);
    }
  }

  const filteredForms = useMemo(() => {
    return forms.filter((form) =>
      form.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [forms, search]);

  return (
    <div className="space-y-6">

      {/* Top Bar */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="relative w-full max-w-md">

          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search forms..."
            className="w-full rounded-2xl border border-white/60 bg-white/80 py-3 pl-11 pr-4 outline-none backdrop-blur-xl"
          />

        </div>

        <a
          href="/builder"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          New Form
        </a>

      </div>

      {/* Loading */}

      {loading && (

        <div className="rounded-3xl bg-white p-10 text-center shadow">
          Loading forms...
        </div>

      )}

      {/* Empty */}

      {!loading && filteredForms.length === 0 && (

        <div className="rounded-3xl border border-dashed border-violet-200 bg-white p-14 text-center">

          <FileText className="mx-auto mb-4 h-10 w-10 text-violet-400" />

          <h3 className="text-xl font-bold">
            No Forms Found
          </h3>

          <p className="mt-2 text-gray-500">
            Create your first TypeFlow form.
          </p>

        </div>

      )}

      {/* Cards */}

      <div className="space-y-4">

        {filteredForms.map((form) => (

          <motion.div
            key={form.id}
            layout
            whileHover={{
              y: -3,
            }}
            className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  {form.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {form.description || "No description"}
                </p>

                <div className="mt-4 flex gap-3">

                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                    {form.status}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                    ID #{form.id}
                  </span>

                </div>

              </div>

              <div className="flex gap-2">

                <button className="rounded-xl bg-violet-100 p-3 text-violet-700">
                  <Eye className="h-4 w-4" />
                </button>

                <button className="rounded-xl bg-indigo-100 p-3 text-indigo-700">
                  <Pencil className="h-4 w-4" />
                </button>

                <button className="rounded-xl bg-gray-100 p-3">
                  <Copy className="h-4 w-4" />
                </button>

                <button className="rounded-xl bg-red-100 p-3 text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}