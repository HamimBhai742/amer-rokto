"use client";

import { useState } from "react";
import type { Donor } from "./data";
import DonorModal from "./DonorModal";

type Props = {
  donors: Donor[];
  viewMode: "grid" | "list";
};

const groupColors: Record<string, string> = {
  "A+":  "from-red-500 to-red-700",
  "A-":  "from-red-600 to-red-800",
  "B+":  "from-rose-500 to-rose-700",
  "B-":  "from-rose-600 to-rose-800",
  "AB+": "from-red-700 to-red-900",
  "AB-": "from-red-800 to-red-950",
  "O+":  "from-red-400 to-red-600",
  "O-":  "from-red-500 to-red-700",
};

export default function DonorGrid({ donors, viewMode }: Props) {
  const [selected, setSelected] = useState<Donor | null>(null);

  return (
    <>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {donors.map((donor, i) => (
            <DonorCard key={donor.id} donor={donor} index={i} onSelect={() => setSelected(donor)} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {donors.map((donor, i) => (
            <DonorListRow key={donor.id} donor={donor} index={i} onSelect={() => setSelected(donor)} />
          ))}
        </div>
      )}

      {selected && (
        <DonorModal donor={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function DonorCard({ donor, index, onSelect }: { donor: Donor; index: number; onSelect: () => void }) {
  const initials = donor.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const gradColor = groupColors[donor.bloodGroup] ?? "from-red-500 to-red-700";

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-red-100 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      aria-label={`${donor.name} - ${donor.bloodGroup} ডোনার`}
    >
      {/* Top accent */}
      <div className={`h-1 bg-gradient-to-r ${gradColor}`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm border-2 border-white shadow">
              {initials}
            </div>
            {/* Available dot */}
            <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${donor.available ? "bg-green-500" : "bg-gray-300"}`} />
          </div>

          {/* Name + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-bold text-gray-900 text-sm truncate">{donor.name}</h3>
              {donor.verified && (
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{donor.gender} · {donor.age} বছর</p>
          </div>

          {/* Blood group badge */}
          <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${gradColor} flex items-center justify-center text-white font-extrabold text-sm shadow-md`}>
            {donor.bloodGroup}
          </div>
        </div>

        {/* Info rows */}
        <div className="space-y-2 mb-4">
          <InfoRow icon="📍" text={`${donor.district}${donor.upazila ? ` · ${donor.upazila}` : ""}`} />
          <InfoRow icon="🩸" text={`মোট দান: ${donor.totalDonations} বার`} />
          <InfoRow icon="🕐" text={`শেষ দান: ${donor.lastDonation}`} />
        </div>

        {/* Status + CTA */}
        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
            donor.available
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${donor.available ? "bg-green-500" : "bg-gray-400"}`} />
            {donor.available ? "উপলব্ধ" : "অনুপলব্ধ"}
          </span>

          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              donor.available
                ? "bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white hover:shadow-md hover:shadow-red-200"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!donor.available}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            যোগাযোগ
          </button>
        </div>
      </div>
    </div>
  );
}

function DonorListRow({ donor, index, onSelect }: { donor: Donor; index: number; onSelect: () => void }) {
  const initials = donor.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const gradColor = groupColors[donor.bloodGroup] ?? "from-red-500 to-red-700";

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-200 overflow-hidden cursor-pointer"
      style={{ animationDelay: `${index * 0.04}s` }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Left accent */}
        <div className={`w-1 self-stretch rounded-full bg-gradient-to-b ${gradColor} flex-shrink-0`} />

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm border-2 border-white shadow-sm">
            {initials}
          </div>
          <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${donor.available ? "bg-green-500" : "bg-gray-300"}`} />
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900 text-sm truncate">{donor.name}</span>
              {donor.verified && (
                <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <p className="text-xs text-gray-400">{donor.gender} · {donor.age} বছর</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-gray-500">📍 {donor.district} · {donor.upazila}</p>
            <p className="text-xs text-gray-400 mt-0.5">🕐 {donor.lastDonation}</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-gray-500">🩸 মোট দান: <span className="font-bold text-[#CC0000]">{donor.totalDonations}</span> বার</p>
            <span className={`inline-flex items-center gap-1 text-xs font-semibold mt-0.5 ${donor.available ? "text-green-600" : "text-gray-400"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${donor.available ? "bg-green-500" : "bg-gray-300"}`} />
              {donor.available ? "উপলব্ধ" : "অনুপলব্ধ"}
            </span>
          </div>
        </div>

        {/* Blood group + CTA */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradColor} flex items-center justify-center text-white font-extrabold text-xs shadow`}>
            {donor.bloodGroup}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              donor.available
                ? "bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white hover:shadow-md"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!donor.available}
          >
            যোগাযোগ
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span className="text-sm flex-shrink-0">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
}
