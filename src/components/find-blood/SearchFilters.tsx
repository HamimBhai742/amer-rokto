"use client";

import { bloodGroups, districts, upazilas } from "./data";
import type { Filters } from "./FindBloodClient";

type Props = {
  filters: Filters;
  onChange: (f: Filters) => void;
  onSearch: () => void;
};

export default function SearchFilters({ filters, onChange, onSearch }: Props) {
  const set = <K extends keyof Filters>(key: K, val: Filters[K]) =>
    onChange({ ...filters, [key]: val });

  const availableUpazilas = filters.district ? (upazilas[filters.district] ?? []) : [];

  const activeCount = [
    filters.bloodGroup,
    filters.district,
    filters.upazila,
    filters.availableOnly,
    filters.verifiedOnly,
    filters.gender,
  ].filter(Boolean).length;

  const reset = () =>
    onChange({ bloodGroup: "", district: "", upazila: "", availableOnly: false, verifiedOnly: false, gender: "", sortBy: "relevance" });

  return (
    <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#CC0000] to-[#8B0000] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          <span className="font-bold text-sm">ফিল্টার করুন</span>
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
        {/* Blood Group */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            🩸 রক্তের গ্রুপ
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {bloodGroups.map((g) => (
              <button
                key={g}
                onClick={() => set("bloodGroup", filters.bloodGroup === g ? "" : g)}
                className={`h-10 rounded-xl text-sm font-extrabold transition-all duration-200 ${
                  filters.bloodGroup === g
                    ? "bg-gradient-to-br from-[#CC0000] to-[#8B0000] text-white shadow-md scale-105"
                    : "bg-red-50 text-[#CC0000] hover:bg-red-100 border border-red-100"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-red-50" />

        {/* District */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            📍 জেলা
          </label>
          <div className="relative">
            <select
              value={filters.district}
              onChange={(e) => { set("district", e.target.value); set("upazila", ""); }}
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/30 focus:border-[#CC0000] transition-colors cursor-pointer pr-8"
            >
              <option value="">সব জেলা</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Upazila */}
        {availableUpazilas.length > 0 && (
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              🏘️ উপজেলা / থানা
            </label>
            <div className="relative">
              <select
                value={filters.upazila}
                onChange={(e) => set("upazila", e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/30 focus:border-[#CC0000] transition-colors cursor-pointer pr-8"
              >
                <option value="">সব উপজেলা</option>
                {availableUpazilas.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-red-50" />

        {/* Gender */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            👤 লিঙ্গ
          </label>
          <div className="flex gap-2">
            {["", "পুরুষ", "মহিলা"].map((g) => (
              <button
                key={g}
                onClick={() => set("gender", g)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  filters.gender === g
                    ? "bg-[#CC0000] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-[#CC0000]"
                }`}
              >
                {g === "" ? "সবাই" : g}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-red-50" />

        {/* Toggle filters */}
        <div className="space-y-3">
          <ToggleRow
            label="শুধু উপলব্ধ ডোনার"
            sublabel="এখন রক্ত দিতে পারবেন"
            icon="✅"
            checked={filters.availableOnly}
            onChange={(v) => set("availableOnly", v)}
          />
          <ToggleRow
            label="শুধু যাচাইকৃত ডোনার"
            sublabel="পরিচয় নিশ্চিত করা হয়েছে"
            icon="🔵"
            checked={filters.verifiedOnly}
            onChange={(v) => set("verifiedOnly", v)}
          />
        </div>

        {/* Search button */}
        <button
          onClick={onSearch}
          className="w-full py-3.5 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          ডোনার খুঁজুন
        </button>

        {/* Emergency link */}
        <a
          href="/emergency"
          className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-dashed border-red-200 rounded-xl text-[#CC0000] text-xs font-semibold hover:bg-red-50 transition-colors duration-200"
        >
          <span className="animate-pulse">🚨</span>
          জরুরি রক্তের অনুরোধ করুন
        </a>
      </div>
    </div>
  );
}

function ToggleRow({
  label, sublabel, icon, checked, onChange,
}: {
  label: string; sublabel: string; icon: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
        checked ? "border-[#CC0000] bg-red-50" : "border-gray-100 bg-gray-50 hover:border-red-200"
      }`}
    >
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
