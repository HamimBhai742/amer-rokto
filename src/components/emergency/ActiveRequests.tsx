"use client";

import { useState } from "react";
import { activeRequests, groupColors } from "./emergencyData";
import type { ActiveRequest } from "./emergencyData";

export default function ActiveRequests() {
  const [filter, setFilter] = useState<"all" | "urgent">("all");

  const shown = filter === "urgent"
    ? activeRequests.filter((r) => r.urgent)
    : activeRequests;

  return (
    <div className="bg-[#111111] border border-red-900/40 rounded-3xl overflow-hidden shadow-xl shadow-red-900/10">
      {/* Header */}
      <div className="px-5 py-4 border-b border-red-900/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <h3 className="text-white font-bold text-sm">সক্রিয় অনুরোধ</h3>
          <span className="bg-red-900/60 text-red-300 text-xs font-bold px-2 py-0.5 rounded-full">
            {activeRequests.length}
          </span>
        </div>
        <div className="flex bg-white/5 rounded-lg p-0.5 gap-0.5">
          {(["all", "urgent"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-200 ${
                filter === f ? "bg-red-700 text-white" : "text-gray-500 hover:text-gray-300"
              }`}>
              {f === "all" ? "সব" : "জরুরি"}
            </button>
          ))}
        </div>
      </div>

      {/* Request list */}
      <div className="divide-y divide-white/5 max-h-[520px] overflow-y-auto">
        {shown.map((req) => (
          <RequestCard key={req.id} req={req} />
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-red-900/30">
        <a href="/find-blood" className="flex items-center justify-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold transition-colors">
          সব ডোনার দেখুন
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function RequestCard({ req }: { req: ActiveRequest }) {
  const grad = groupColors[req.bloodGroup] ?? "from-red-500 to-red-700";

  return (
    <div className="px-5 py-4 hover:bg-white/[0.03] transition-colors group">
      <div className="flex items-start gap-3">
        {/* Blood group */}
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-extrabold text-sm shadow-md flex-shrink-0`}>
          {req.bloodGroup}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-white text-sm font-semibold truncate">{req.hospital}</span>
            {req.urgent && (
              <span className="flex-shrink-0 text-[10px] font-bold bg-red-900/60 text-red-300 border border-red-700/40 px-1.5 py-0.5 rounded-full animate-pulse">
                জরুরি
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <span>📍</span>{req.district}
            </span>
            <span className="flex items-center gap-1">
              <span>🩸</span>{req.units} ব্যাগ
            </span>
            <span className="flex items-center gap-1">
              <span>🕐</span>{req.postedAt}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">{req.reason}</span>
            {req.responded > 0 && (
              <span className="text-xs text-green-500 font-semibold">
                · {req.responded} জন সাড়া দিয়েছেন
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Respond button — shows on hover */}
      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <a
          href={`tel:${req.contact}`}
          className="flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-900/40 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          সাহায্য করতে কল করুন
        </a>
      </div>
    </div>
  );
}
