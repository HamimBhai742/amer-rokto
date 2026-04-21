"use client";

import type { BloodBank } from "./bloodBankData";
import { stockLevelConfig, typeConfig, groupColors } from "./bloodBankData";
import { bloodGroups } from "@/components/find-blood/data";

type Props = {
  banks: BloodBank[];
  viewMode: "grid" | "list";
  onSelect: (b: BloodBank) => void;
};

export default function BankGrid({ banks, viewMode, onSelect }: Props) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {banks.map((bank, i) => (
          <BankCard key={bank.id} bank={bank} index={i} onSelect={() => onSelect(bank)} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {banks.map((bank, i) => (
        <BankListRow key={bank.id} bank={bank} index={i} onSelect={() => onSelect(bank)} />
      ))}
    </div>
  );
}

function BankCard({ bank, index, onSelect }: { bank: BloodBank; index: number; onSelect: () => void }) {
  const typeCfg = typeConfig[bank.type];
  // Find most critical stock
  const criticalGroups = bank.stock.filter((s) => s.level === "critical" || s.level === "low");

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-red-100 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
      style={{ animationDelay: `${index * 0.04}s` }}
      onClick={onSelect}
      role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
    >
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-[#CC0000] to-[#8B0000]" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFF5F5] to-red-100 border border-red-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            🏦
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">{bank.name}</h3>
            <div className="flex flex-wrap gap-1.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeCfg.bg} ${typeCfg.color}`}>
                {typeCfg.label}
              </span>
              {bank.emergency && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                  🚨 জরুরি
                </span>
              )}
              {bank.verified && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  ✓ যাচাইকৃত
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Info rows */}
        <div className="space-y-1.5 mb-4">
          <InfoRow icon="📍" text={`${bank.district} · ${bank.address.split(",")[0]}`} />
          <InfoRow icon="⏰" text={bank.openHours} />
          <InfoRow icon="📞" text={bank.phone} />
        </div>

        {/* Rating + donations */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(bank.rating) ? "text-yellow-400" : "text-gray-200"}`}
                fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <span className="text-xs font-bold text-gray-700 ml-1">{bank.rating}</span>
          </div>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-500">
            <span className="font-bold text-[#CC0000]">{bank.totalDonations.toLocaleString()}</span> মোট দান
          </span>
        </div>

        {/* Mini stock grid — show 8 groups */}
        <div className="mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">রক্তের মজুদ</p>
          <div className="grid grid-cols-8 gap-1">
            {bank.stock.map((s) => {
              const cfg = stockLevelConfig[s.level];
              return (
                <div key={s.group} className="flex flex-col items-center gap-0.5" title={`${s.group}: ${s.units} ব্যাগ`}>
                  <div className={`w-full h-1.5 rounded-full ${cfg.bar}`} />
                  <span className="text-[9px] font-bold text-gray-500">{s.group.replace("+", "⁺").replace("-", "⁻")}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Critical alert */}
        {criticalGroups.length > 0 && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-3">
            <span className="text-red-500 text-xs animate-pulse">⚠️</span>
            <p className="text-xs text-red-600 font-medium">
              {criticalGroups.map((s) => s.group).join(", ")} — সংকটজনক মজুদ
            </p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
          className="w-full py-2.5 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white text-xs font-bold rounded-xl hover:shadow-md hover:shadow-red-200 transition-all duration-200 flex items-center justify-center gap-1.5"
        >
          বিস্তারিত দেখুন
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function BankListRow({ bank, index, onSelect }: { bank: BloodBank; index: number; onSelect: () => void }) {
  const typeCfg = typeConfig[bank.type];

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-200 overflow-hidden cursor-pointer"
      style={{ animationDelay: `${index * 0.03}s` }}
      onClick={onSelect}
      role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Left accent */}
        <div className="w-1 self-stretch rounded-full bg-gradient-to-b from-[#CC0000] to-[#8B0000] flex-shrink-0" />

        {/* Icon */}
        <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-xl flex-shrink-0">
          🏦
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
          <div>
            <h3 className="font-bold text-gray-900 text-sm truncate">{bank.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${typeCfg.bg} ${typeCfg.color}`}>
                {typeCfg.label}
              </span>
              {bank.emergency && <span className="text-[10px] text-orange-600 font-semibold">🚨 জরুরি</span>}
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-gray-500">📍 {bank.district}</p>
            <p className="text-xs text-gray-400 mt-0.5">⏰ {bank.openHours}</p>
          </div>
          <div className="hidden sm:block">
            {/* Mini stock dots */}
            <div className="flex gap-1 flex-wrap">
              {bank.stock.map((s) => (
                <div key={s.group} className={`w-2 h-2 rounded-full ${stockLevelConfig[s.level].dot}`}
                  title={`${s.group}: ${s.units} ব্যাগ`} />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              ⭐ {bank.rating} · {bank.totalDonations.toLocaleString()} দান
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white text-xs font-bold rounded-xl hover:shadow-md transition-all flex-shrink-0"
        >
          দেখুন
        </button>
      </div>
    </div>
  );
}

function InfoRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span className="flex-shrink-0">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
}
