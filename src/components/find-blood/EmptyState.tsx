"use client";

import Link from "next/link";
import type { Filters } from "./FindBloodClient";

type Props = {
  filters: Filters;
  onReset: () => void;
};

export default function EmptyState({ filters, onReset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-red-50 shadow-sm">
      {/* Animated empty drop */}
      <div className="relative w-24 h-28 mb-6">
        <svg viewBox="0 0 40 50" fill="none" className="w-full h-full opacity-15">
          <path
            d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z"
            fill="#CC0000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">কোনো ডোনার পাওয়া যায়নি</h3>
      <p className="text-gray-400 text-sm max-w-xs mb-2">
        {filters.bloodGroup && filters.district
          ? `${filters.district}-এ ${filters.bloodGroup} গ্রুপের কোনো ডোনার এখন পাওয়া যাচ্ছে না।`
          : "আপনার ফিল্টার অনুযায়ী কোনো ডোনার পাওয়া যায়নি।"}
      </p>
      <p className="text-gray-400 text-xs mb-8">
        ফিল্টার পরিবর্তন করুন অথবা জরুরি অনুরোধ পাঠান
      </p>

      {/* Suggestions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#CC0000] text-[#CC0000] font-semibold rounded-xl hover:bg-red-50 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          ফিল্টার রিসেট করুন
        </button>
        <Link
          href="/request-blood"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-200 transition-all text-sm"
        >
          <span className="animate-pulse">🩸</span>
          রক্তের অনুরোধ করুন
        </Link>
      </div>

      {/* Tips */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-4 max-w-sm text-left">
        <p className="text-xs font-bold text-[#CC0000] mb-2">💡 পরামর্শ:</p>
        <ul className="space-y-1.5 text-xs text-gray-500">
          <li className="flex items-start gap-2">
            <span className="text-[#CC0000] mt-0.5">•</span>
            জেলার ফিল্টার সরিয়ে সারা দেশে খুঁজুন
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#CC0000] mt-0.5">•</span>
            "শুধু উপলব্ধ" ফিল্টার বন্ধ করে দেখুন
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#CC0000] mt-0.5">•</span>
            জরুরি অনুরোধ পাঠালে ডোনাররা নোটিফিকেশন পাবেন
          </li>
        </ul>
      </div>
    </div>
  );
}
