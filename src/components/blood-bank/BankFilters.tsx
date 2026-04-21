"use client";

import { bloodGroups, districts } from "@/components/find-blood/data";
import { typeConfig } from "./bloodBankData";
import type { BankFilters } from "./BloodBankClient";

type Props = {
  filters: BankFilters;
  onChange: (f: BankFilters) => void;
  total: number;
  found: number;
};

export default function BankFilters({ filters, onChange, total, found }: Props) {
  const set = <K extends keyof BankFilters>(k: K, v: BankFilters[K]) =>
    onChange({ ...filters, [k]: v });

  const activeCount = [
    filters.district, filters.type, filters.bloodGroup,
    filters.emergencyOnly, filters.verifiedOnly,
  ].filter(Boolean).length;

  const reset = () => onChange({ search: "", district: "", type: "", bloodGroup: "", emergencyOnly: false, verifiedOnly: false });

  return (
    <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#CC0000] to-[#8B0000] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          <span className="font-bold text-sm">ফিল্টার</span>
          {activeCount > 0 && (
            <span className="bg-yellow-400 text-gray-900 text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={reset} className="text-white/70 hover:text-white text-xs underline transition-colors">
            রিসেট
          </button>
        )}
      </div>

      <div className="p-5 space-y-5">
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="নাম বা ঠিকানা খুঁজুন..."
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-colors"
          />
          {filters.search && (
            <button onClick={() => set("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="h-px bg-red-50" />

        {/* Blood group with stock */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            🩸 রক্তের গ্রুপ মজুদ আছে
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {bloodGroups.map((g) => (
              <button key={g} onClick={() => set("bloodGroup", filters.bloodGroup === g ? "" : g)}
                className={`h-10 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                  filters.bloodGroup === g
                    ? "bg-gradient-to-br from-[#CC0000] to-[#8B0000] text-white shadow-md scale-105"
                    : "bg-red-50 text-[#CC0000] hover:bg-red-100 border border-red-100"
                }`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-red-50" />

        {/* District */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            📍 জেলা
          </label>
          <div className="relative">
            <select value={filters.district} onChange={(e) => set("district", e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-colors cursor-pointer pr-8">
              <option value="">সব জেলা</option>
              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="h-px bg-red-50" />

        {/* Type */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            🏥 ব্যাংকের ধরন
          </label>
          <div className="space-y-1.5">
            {[
              { value: "", label: "সব ধরন" },
              { value: "government", label: typeConfig.government.label },
              { value: "private",    label: typeConfig.private.label },
              { value: "voluntary",  label: typeConfig.voluntary.label },
            ].map((opt) => (
              <button key={opt.value} onClick={() => set("type", opt.value)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-200 text-left ${
                  filters.type === opt.value
                    ? "bg-[#CC0000] text-white font-semibold"
                    : "bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-[#CC0000]"
                }`}>
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  filters.type === opt.value ? "bg-white" :
                  opt.value === "government" ? "bg-blue-500" :
                  opt.value === "private" ? "bg-purple-500" :
                  opt.value === "voluntary" ? "bg-green-500" : "bg-gray-400"
                }`} />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-red-50" />

        {/* Toggles */}
        <div className="space-y-2.5">
          <ToggleRow
            label="শুধু জরুরি সেবা"
            sublabel="২৪/৭ জরুরি সেবা আছে"
            icon="🚨"
            checked={filters.emergencyOnly}
            onChange={(v) => set("emergencyOnly", v)}
          />
          <ToggleRow
            label="শুধু যাচাইকৃত"
            sublabel="আমার রক্ত কর্তৃক যাচাইকৃত"
            icon="✅"
            checked={filters.verifiedOnly}
            onChange={(v) => set("verifiedOnly", v)}
          />
        </div>

        {/* Result count */}
        <div className="bg-red-50 rounded-xl px-4 py-2.5 text-center">
          <span className="text-sm text-gray-600">
            <span className="font-extrabold text-[#CC0000] text-base">{found}</span>
            <span className="text-gray-400">/{total}</span> টি ব্লাড ব্যাংক
          </span>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, sublabel, icon, checked, onChange }: {
  label: string; sublabel: string; icon: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <button onClick={() => onChange(!checked)}
      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
        checked ? "border-[#CC0000] bg-red-50" : "border-gray-100 bg-gray-50 hover:border-red-200"
      }`}>
      <span className="text-base">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold ${checked ? "text-[#CC0000]" : "text-gray-700"}`}>{label}</p>
        <p className="text-[10px] text-gray-400 truncate">{sublabel}</p>
      </div>
      <div className={`w-9 h-5 rounded-full transition-all duration-300 flex-shrink-0 relative ${checked ? "bg-[#CC0000]" : "bg-gray-200"}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${checked ? "left-4" : "left-0.5"}`} />
      </div>
    </button>
  );
}
