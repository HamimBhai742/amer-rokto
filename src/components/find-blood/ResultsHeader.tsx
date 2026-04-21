"use client";

import type { Filters } from "./FindBloodClient";

type Props = {
  count: number;
  filters: Filters;
  viewMode: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
  onSortChange: (s: Filters["sortBy"]) => void;
  isLoading: boolean;
};

export default function ResultsHeader({ count, filters, viewMode, onViewChange, onSortChange, isLoading }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 bg-white rounded-2xl border border-red-50 px-4 py-3 shadow-sm">
      {/* Left: result count + active tags */}
      <div className="flex flex-wrap items-center gap-2">
        {isLoading ? (
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
        ) : (
          <span className="text-sm font-bold text-gray-800">
            <span className="text-[#CC0000] text-base">{count}</span> জন ডোনার পাওয়া গেছে
          </span>
        )}

        {/* Active filter chips */}
        {filters.bloodGroup && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-100 text-[#CC0000] text-xs font-bold rounded-full">
            🩸 {filters.bloodGroup}
          </span>
        )}
        {filters.district && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
            📍 {filters.district}
          </span>
        )}
        {filters.availableOnly && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
            ✅ উপলব্ধ
          </span>
        )}
        {filters.verifiedOnly && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">
            🔵 যাচাইকৃত
          </span>
        )}
      </div>

      {/* Right: sort + view toggle */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Sort */}
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(e) => onSortChange(e.target.value as Filters["sortBy"])}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-3 pr-7 py-1.5 text-xs font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 cursor-pointer"
          >
            <option value="relevance">প্রাসঙ্গিকতা</option>
            <option value="donations">সর্বাধিক দান</option>
            <option value="recent">সাম্প্রতিক</option>
          </select>
          <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* View toggle */}
        <div className="flex bg-gray-100 rounded-xl p-0.5">
          <button
            onClick={() => onViewChange("grid")}
            className={`p-1.5 rounded-lg transition-all duration-200 ${viewMode === "grid" ? "bg-white shadow text-[#CC0000]" : "text-gray-400 hover:text-gray-600"}`}
            aria-label="Grid view"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
            </svg>
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={`p-1.5 rounded-lg transition-all duration-200 ${viewMode === "list" ? "bg-white shadow text-[#CC0000]" : "text-gray-400 hover:text-gray-600"}`}
            aria-label="List view"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
