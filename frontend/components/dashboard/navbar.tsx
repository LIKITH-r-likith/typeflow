"use client";

import { Search, Bell } from "lucide-react";

export function Navbar() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-gray-100 bg-white px-6 py-4 sticky top-0 z-10">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search forms, responses..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-xl p-2.5 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-600" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-medium text-white">
          AK
        </div>
      </div>
    </header>
  );
}