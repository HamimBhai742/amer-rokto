"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchFilters from "./SearchFilters";
import DonorGrid from "./DonorGrid";
import ResultsHeader from "./ResultsHeader";
import EmptyState from "./EmptyState";
import { mockDonors } from "./data";
import type { Donor } from "./data";

export type Filters = {
  bloodGroup: string;
  district: string;
  upazila: string;
  availableOnly: boolean;
  verifiedOnly: boolean;
  gender: string;
  sortBy: "relevance" | "donations" | "recent";
};

function FindBloodInner() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    bloodGroup: searchParams.get("group") || "",
    district: searchParams.get("district") || "",
    upazila: "",
    availableOnly: false,
    verifiedOnly: false,
    gender: "",
    sortBy: "relevance",
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(
    !!(searchParams.get("group") || searchParams.get("district"))
  );

  // Simulate search loading
  const triggerSearch = () => {
    setIsSearching(true);
    setHasSearched(true);
    setTimeout(() => setIsSearching(false), 600);
  };

  const filteredDonors: Donor[] = useMemo(() => {
    if (!hasSearched) return [];
    let result = [...mockDonors];

    if (filters.bloodGroup)
      result = result.filter((d) => d.bloodGroup === filters.bloodGroup);
    if (filters.district)
      result = result.filter((d) => d.district === filters.district);
    if (filters.upazila)
      result = result.filter((d) => d.upazila === filters.upazila);
    if (filters.availableOnly)
      result = result.filter((d) => d.available);
    if (filters.verifiedOnly)
      result = result.filter((d) => d.verified);
    if (filters.gender)
      result = result.filter((d) => d.gender === filters.gender);

    if (filters.sortBy === "donations")
      result.sort((a, b) => b.totalDonations - a.totalDonations);
    else if (filters.sortBy === "recent")
      result.sort((a, b) => a.lastDonation.localeCompare(b.lastDonation));
    else
      result.sort((a, b) => (b.available ? 1 : 0) - (a.available ? 1 : 0));

    return result;
  }, [filters, hasSearched]);

  // Auto-search if URL params present
  useEffect(() => {
    if (searchParams.get("group") || searchParams.get("district")) {
      triggerSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Page Hero ── */}
      <div className="relative bg-gradient-to-br from-[#8B0000] via-[#CC0000] to-[#FF2222] overflow-hidden">
        {/* ECG line */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 1200 80" className="w-full h-full" preserveAspectRatio="none">
            <polyline
              points="0,40 120,40 160,40 185,8 210,72 235,40 300,40 340,40 365,10 390,70 415,40 480,40 520,40 545,8 570,72 595,40 660,40 700,40 725,10 750,70 775,40 840,40 880,40 905,8 930,72 955,40 1020,40 1060,40 1085,10 1110,70 1135,40 1200,40"
              fill="none" stroke="white" strokeWidth="2"
            />
          </svg>
        </div>
        {/* Floating drops */}
        <div className="absolute top-4 right-12 opacity-15 pointer-events-none" style={{ animation: "floatDrop 4s ease-in-out infinite" }}>
          <svg width="32" height="40" viewBox="0 0 40 50" fill="none">
            <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="white" />
          </svg>
        </div>
        <div className="absolute bottom-4 left-16 opacity-10 pointer-events-none" style={{ animation: "floatDrop 5s ease-in-out 1s infinite" }}>
          <svg width="20" height="25" viewBox="0 0 40 50" fill="none">
            <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="white" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              রিয়েল-টাইম ডোনার ডেটাবেজ
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
              রক্তের <span className="text-yellow-300">ডোনার</span> খুঁজুন
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto">
              আপনার প্রয়োজনীয় রক্তের গ্রুপ ও অবস্থান দিয়ে কাছের স্বেচ্ছাসেবী ডোনার খুঁজুন
            </p>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
            <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,10 1440,20 L1440,40 L0,40 Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar filters */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <SearchFilters
              filters={filters}
              onChange={setFilters}
              onSearch={triggerSearch}
            />
          </aside>

          {/* Results area */}
          <main className="flex-1 min-w-0">
            {hasSearched && (
              <ResultsHeader
                count={filteredDonors.length}
                filters={filters}
                viewMode={viewMode}
                onViewChange={setViewMode}
                onSortChange={(s) => setFilters((f) => ({ ...f, sortBy: s }))}
                isLoading={isSearching}
              />
            )}

            {isSearching ? (
              <SearchingSkeleton />
            ) : !hasSearched ? (
              <SearchPrompt />
            ) : filteredDonors.length === 0 ? (
              <EmptyState filters={filters} onReset={() => setFilters((f) => ({ ...f, bloodGroup: "", district: "", upazila: "", availableOnly: false, verifiedOnly: false, gender: "" }))} />
            ) : (
              <DonorGrid donors={filteredDonors} viewMode={viewMode} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function SearchPrompt() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-24 h-24 mb-6 opacity-20">
        <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
          <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="#CC0000" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">ডোনার খুঁজতে শুরু করুন</h3>
      <p className="text-gray-400 max-w-sm">
        বাম পাশের ফিল্টার থেকে রক্তের গ্রুপ ও জেলা বেছে "খুঁজুন" বাটনে ক্লিক করুন
      </p>
    </div>
  );
}

function SearchingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-200" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-2/3" />
          </div>
          <div className="mt-4 h-9 bg-gray-200 rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export default function FindBloodClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <FindBloodInner />
    </Suspense>
  );
}
