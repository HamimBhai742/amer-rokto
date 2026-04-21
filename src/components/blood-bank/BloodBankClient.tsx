"use client";

import { useState, useMemo } from "react";
import BloodBankHero from "./BloodBankHero";
import BankFilters from "./BankFilters";
import BankGrid from "./BankGrid";
import BankDetailModal from "./BankDetailModal";
import StockOverview from "./StockOverview";
import { bloodBanks } from "./bloodBankData";
import type { BloodBank } from "./bloodBankData";

export type BankFilters = {
  search: string;
  district: string;
  type: string;
  bloodGroup: string;
  emergencyOnly: boolean;
  verifiedOnly: boolean;
};

export default function BloodBankClient() {
  const [filters, setFilters] = useState<BankFilters>({
    search: "", district: "", type: "", bloodGroup: "",
    emergencyOnly: false, verifiedOnly: false,
  });
  const [selected, setSelected] = useState<BloodBank | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"rating" | "donations" | "name">("rating");

  const filtered = useMemo(() => {
    let result = [...bloodBanks];

    if (filters.search)
      result = result.filter((b) =>
        b.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        b.district.includes(filters.search) ||
        b.address.includes(filters.search)
      );
    if (filters.district)
      result = result.filter((b) => b.district === filters.district);
    if (filters.type)
      result = result.filter((b) => b.type === filters.type);
    if (filters.bloodGroup)
      result = result.filter((b) =>
        b.stock.some((s) => s.group === filters.bloodGroup && s.units > 0)
      );
    if (filters.emergencyOnly)
      result = result.filter((b) => b.emergency);
    if (filters.verifiedOnly)
      result = result.filter((b) => b.verified);

    if (sortBy === "rating")
      result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "donations")
      result.sort((a, b) => b.totalDonations - a.totalDonations);
    else
      result.sort((a, b) => a.name.localeCompare(b.name, "bn"));

    return result;
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <BloodBankHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Stock overview strip */}
        <StockOverview banks={bloodBanks} />

        <div className="mt-8 flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <BankFilters
              filters={filters}
              onChange={setFilters}
              total={bloodBanks.length}
              found={filtered.length}
            />
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Results bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 bg-white rounded-2xl border border-red-50 px-4 py-3 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-gray-800">
                  <span className="text-[#CC0000] text-base">{filtered.length}</span> টি ব্লাড ব্যাংক
                </span>
                {filters.district && (
                  <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                    📍 {filters.district}
                  </span>
                )}
                {filters.bloodGroup && (
                  <span className="px-2.5 py-0.5 bg-red-50 text-[#CC0000] text-xs font-bold rounded-full border border-red-100">
                    🩸 {filters.bloodGroup} মজুদ আছে
                  </span>
                )}
                {filters.emergencyOnly && (
                  <span className="px-2.5 py-0.5 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full border border-orange-100">
                    🚨 জরুরি সেবা
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-3 pr-7 py-1.5 text-xs font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 cursor-pointer"
                  >
                    <option value="rating">রেটিং অনুযায়ী</option>
                    <option value="donations">মোট দান অনুযায়ী</option>
                    <option value="name">নাম অনুযায়ী</option>
                  </select>
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="flex bg-gray-100 rounded-xl p-0.5">
                  {(["grid", "list"] as const).map((v) => (
                    <button key={v} onClick={() => setViewMode(v)}
                      className={`p-1.5 rounded-lg transition-all duration-200 ${viewMode === v ? "bg-white shadow text-[#CC0000]" : "text-gray-400 hover:text-gray-600"}`}
                      aria-label={v === "grid" ? "Grid view" : "List view"}>
                      {v === "grid" ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <EmptyBankState onReset={() => setFilters({ search: "", district: "", type: "", bloodGroup: "", emergencyOnly: false, verifiedOnly: false })} />
            ) : (
              <BankGrid banks={filtered} viewMode={viewMode} onSelect={setSelected} />
            )}
          </main>
        </div>
      </div>

      {selected && <BankDetailModal bank={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function EmptyBankState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-red-50 shadow-sm">
      <div className="w-20 h-24 mb-5 opacity-15">
        <svg viewBox="0 0 40 50" fill="none" className="w-full h-full">
          <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="#CC0000" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-700 mb-2">কোনো ব্লাড ব্যাংক পাওয়া যায়নি</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-xs">ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
      <button onClick={onReset}
        className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#CC0000] text-[#CC0000] font-semibold rounded-xl hover:bg-red-50 transition-colors text-sm">
        ফিল্টার রিসেট করুন
      </button>
    </div>
  );
}
