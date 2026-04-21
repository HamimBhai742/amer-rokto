"use client";

import { useEffect } from "react";
import type { Donor } from "./data";

type Props = {
  donor: Donor;
  onClose: () => void;
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

export default function DonorModal({ donor, onClose }: Props) {
  const gradColor = groupColors[donor.bloodGroup] ?? "from-red-500 to-red-700";
  const initials = donor.name.split(" ").map((w) => w[0]).slice(0, 2).join("");

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${donor.name} এর প্রোফাইল`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-fade-up">
        {/* Header gradient */}
        <div className={`bg-gradient-to-br ${gradColor} px-6 pt-6 pb-10 relative overflow-hidden`}>
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="বন্ধ করুন"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Decorative drop */}
          <div className="absolute -top-4 -right-4 opacity-10">
            <svg width="80" height="100" viewBox="0 0 40 50" fill="none">
              <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="white" />
            </svg>
          </div>

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
                {initials}
              </div>
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${donor.available ? "bg-green-400" : "bg-gray-300"}`} />
            </div>

            <div className="text-white">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold">{donor.name}</h2>
                {donor.verified && (
                  <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <p className="text-white/75 text-sm">{donor.gender} · {donor.age} বছর</p>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold mt-1 px-2 py-0.5 rounded-full ${donor.available ? "bg-green-500/30 text-green-100" : "bg-white/20 text-white/60"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${donor.available ? "bg-green-300" : "bg-white/40"}`} />
                {donor.available ? "এখন উপলব্ধ" : "এখন অনুপলব্ধ"}
              </span>
            </div>

            {/* Big blood group */}
            <div className="ml-auto w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
              {donor.bloodGroup}
            </div>
          </div>
        </div>

        {/* White card overlap */}
        <div className="relative -mt-6 bg-white rounded-t-3xl px-6 pt-5 pb-6">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <StatBox label="মোট দান" value={`${donor.totalDonations}x`} icon="🩸" />
            <StatBox label="শেষ দান" value={donor.lastDonation} icon="🕐" small />
            <StatBox label="যাচাই" value={donor.verified ? "হ্যাঁ ✓" : "না"} icon="🔵" />
          </div>

          {/* Details */}
          <div className="space-y-3 mb-5">
            <DetailRow icon="📍" label="অবস্থান" value={`${donor.district}, ${donor.upazila}`} />
            <DetailRow icon="👤" label="লিঙ্গ" value={donor.gender} />
            <DetailRow icon="🎂" label="বয়স" value={`${donor.age} বছর`} />
          </div>

          {/* Important note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 flex gap-2">
            <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠️</span>
            <p className="text-xs text-amber-700 leading-relaxed">
              যোগাযোগের আগে ডোনারের সম্মতি নিশ্চিত করুন। ফোন নম্বর শুধুমাত্র রক্তদানের উদ্দেশ্যে ব্যবহার করুন।
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <a
              href={donor.available ? `tel:${donor.phone}` : undefined}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                donor.available
                  ? "bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-disabled={!donor.available}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              ফোন করুন
            </a>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-bold text-sm border-2 border-gray-200 text-gray-600 hover:border-red-200 hover:text-[#CC0000] transition-all duration-200"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon, small }: { label: string; value: string; icon: string; small?: boolean }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
      <div className="text-lg mb-1">{icon}</div>
      <div className={`font-extrabold text-gray-900 ${small ? "text-xs" : "text-base"}`}>{value}</div>
      <div className="text-[10px] text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
      <span className="text-base w-6 flex-shrink-0">{icon}</span>
      <span className="text-xs text-gray-400 w-16 flex-shrink-0">{label}</span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}
