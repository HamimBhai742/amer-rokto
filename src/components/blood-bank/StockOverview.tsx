"use client";

import { bloodGroups } from "@/components/find-blood/data";
import { groupColors, stockLevelConfig } from "./bloodBankData";
import type { BloodBank } from "./bloodBankData";

type Props = { banks: BloodBank[] };

export default function StockOverview({ banks }: Props) {
  // Aggregate total units per blood group across all banks
  const totals = bloodGroups.map((g) => {
    const total = banks.reduce((sum, bank) => {
      const s = bank.stock.find((s) => s.group === g);
      return sum + (s?.units ?? 0);
    }, 0);
    const level =
      total === 0 ? "unavailable" :
      total <= 10 ? "critical" :
      total <= 30 ? "low" :
      total <= 80 ? "medium" : "high";
    return { group: g, total, level };
  });

  return (
    <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-red-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">🩸</span>
          <h2 className="font-bold text-gray-900 text-sm">জাতীয় রক্তের মজুদ — সামগ্রিক চিত্র</h2>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {(["high", "medium", "low", "critical", "unavailable"] as const).map((l) => (
            <div key={l} className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className={`w-2.5 h-2.5 rounded-full ${stockLevelConfig[l].dot}`} />
              {stockLevelConfig[l].label}
            </div>
          ))}
        </div>
      </div>

      {/* Blood group stock bars */}
      <div className="grid grid-cols-4 sm:grid-cols-8 divide-x divide-red-50">
        {totals.map(({ group, total, level }) => {
          const cfg = stockLevelConfig[level as keyof typeof stockLevelConfig];
          const grad = groupColors[group];
          const pct = Math.min(100, (total / 120) * 100);

          return (
            <div key={group} className="flex flex-col items-center py-4 px-2 group hover:bg-red-50/50 transition-colors">
              {/* Blood group badge */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-extrabold text-sm shadow-sm mb-3`}>
                {group}
              </div>

              {/* Vertical bar */}
              <div className="w-4 h-16 bg-gray-100 rounded-full overflow-hidden flex flex-col-reverse mb-2">
                <div
                  className={`w-full rounded-full transition-all duration-700 ${cfg.bar}`}
                  style={{ height: `${pct}%` }}
                />
              </div>

              {/* Units count */}
              <span className={`text-xs font-extrabold ${cfg.color}`}>{total}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">ব্যাগ</span>

              {/* Level label */}
              <span className={`text-[10px] font-semibold mt-1 px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color} hidden sm:block`}>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-[11px] text-gray-400">
          মজুদের তথ্য প্রতি ৬ ঘণ্টায় আপডেট হয়। সর্বশেষ আপডেট: আজ সকাল ৮:০০ টা
        </p>
      </div>
    </div>
  );
}
