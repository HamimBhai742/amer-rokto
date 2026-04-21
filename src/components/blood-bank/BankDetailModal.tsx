"use client";

import { useEffect, useState } from "react";
import type { BloodBank } from "./bloodBankData";
import { stockLevelConfig, typeConfig, groupColors } from "./bloodBankData";

type Props = { bank: BloodBank; onClose: () => void };

export default function BankDetailModal({ bank, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"stock" | "info" | "facilities">("stock");
  const typeCfg = typeConfig[bank.type];

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog" aria-modal="true" aria-label={bank.name}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-fade-up max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#8B0000] via-[#CC0000] to-[#FF2222] px-6 pt-6 pb-10 flex-shrink-0 overflow-hidden">
          {/* Decorative drop */}
          <div className="absolute -top-4 -right-4 opacity-10 pointer-events-none">
            <svg width="100" height="120" viewBox="0 0 40 50" fill="none">
              <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="white" />
            </svg>
          </div>
          {/* ECG */}
          <div className="absolute bottom-2 left-0 right-0 opacity-15 pointer-events-none">
            <svg viewBox="0 0 600 20" className="w-full" preserveAspectRatio="none">
              <polyline points="0,10 60,10 75,10 85,2 95,18 105,10 140,10 155,10 165,3 175,17 185,10 220,10 235,10 245,2 255,18 265,10 300,10 315,10 325,3 335,17 345,10 380,10 395,10 405,2 415,18 425,10 460,10 475,10 485,3 495,17 505,10 540,10 555,10 565,2 575,18 585,10 600,10"
                fill="none" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          {/* Close */}
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
              🏦
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-extrabold text-lg leading-tight mb-2">{bank.name}</h2>
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/30`}>
                  {typeCfg.label}
                </span>
                {bank.emergency && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-500/30 text-orange-100 border border-orange-400/30">
                    🚨 জরুরি সেবা
                  </span>
                )}
                {bank.verified && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/30 text-blue-100 border border-blue-400/30">
                    ✓ যাচাইকৃত
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "রেটিং", value: `⭐ ${bank.rating}` },
              { label: "মোট দান", value: bank.totalDonations.toLocaleString() },
              { label: "সেবার সময়", value: bank.openHours },
            ].map((s) => (
              <div key={s.label} className="bg-white/15 rounded-xl p-2.5 text-center">
                <p className="text-white font-extrabold text-sm">{s.value}</p>
                <p className="text-white/60 text-[10px] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* White card overlap */}
        <div className="relative -mt-6 bg-white rounded-t-3xl flex-1 overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 px-6 pt-4 flex-shrink-0">
            {(["stock", "info", "facilities"] as const).map((tab) => {
              const labels = { stock: "🩸 রক্তের মজুদ", info: "📋 তথ্য", facilities: "🏥 সুবিধা" };
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all duration-200 ${
                    activeTab === tab
                      ? "border-[#CC0000] text-[#CC0000]"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}>
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {activeTab === "stock" && <StockTab bank={bank} />}
            {activeTab === "info" && <InfoTab bank={bank} />}
            {activeTab === "facilities" && <FacilitiesTab bank={bank} />}
          </div>

          {/* Footer actions */}
          <div className="flex-shrink-0 px-6 pb-6 pt-3 border-t border-gray-50 flex gap-3">
            <a href={`tel:${bank.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 transition-all text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              ফোন করুন
            </a>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(bank.name + " " + bank.address)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:border-red-200 hover:text-[#CC0000] transition-all text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              মানচিত্রে দেখুন
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function StockTab({ bank }: { bank: BloodBank }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400 mb-4">
        সর্বশেষ আপডেট: আজ সকাল ৮:০০ টা · প্রতি ৬ ঘণ্টায় আপডেট হয়
      </p>
      {bank.stock.map((s) => {
        const cfg = stockLevelConfig[s.level];
        const grad = groupColors[s.group];
        const pct = Math.min(100, (s.units / 30) * 100);

        return (
          <div key={s.group} className={`flex items-center gap-4 p-3 rounded-xl border ${cfg.bg} ${
            s.level === "critical" ? "border-red-200" :
            s.level === "low" ? "border-orange-200" :
            s.level === "unavailable" ? "border-gray-200" : "border-transparent"
          }`}>
            {/* Badge */}
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-extrabold text-sm shadow-sm flex-shrink-0`}>
              {s.group}
            </div>

            {/* Bar */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-gray-800">{s.group} রক্ত</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                  {cfg.label}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${cfg.bar}`}
                  style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {s.units === 0 ? "মজুদ নেই" : `${s.units} ব্যাগ উপলব্ধ`}
              </p>
            </div>

            {/* Critical badge */}
            {(s.level === "critical" || s.level === "low") && (
              <span className="text-lg animate-pulse flex-shrink-0">⚠️</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function InfoTab({ bank }: { bank: BloodBank }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { icon: "📍", label: "ঠিকানা",       value: bank.address },
          { icon: "🏙️", label: "জেলা",          value: bank.district },
          { icon: "📞", label: "ফোন",           value: bank.phone },
          { icon: "📞", label: "বিকল্প ফোন",   value: bank.phone2 ?? "—" },
          { icon: "✉️", label: "ইমেইল",         value: bank.email ?? "—" },
          { icon: "⏰", label: "সেবার সময়",    value: bank.openHours },
          { icon: "🚨", label: "জরুরি সেবা",   value: bank.emergency ? "হ্যাঁ, ২৪/৭" : "না" },
          { icon: "✅", label: "যাচাইকৃত",     value: bank.verified ? "হ্যাঁ" : "না" },
        ].map((row) => (
          <div key={row.label} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <span className="text-base flex-shrink-0 mt-0.5">{row.icon}</span>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{row.label}</p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">{row.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Map placeholder */}
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden h-40 flex items-center justify-center border border-gray-200">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-sm text-gray-500 font-medium">মানচিত্র লোড হচ্ছে...</p>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(bank.name + " " + bank.address)}`}
            target="_blank" rel="noopener noreferrer"
            className="text-xs text-[#CC0000] underline mt-1 block hover:text-[#8B0000]">
            Google Maps-এ দেখুন →
          </a>
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(#CC0000 1px, transparent 1px), linear-gradient(90deg, #CC0000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      </div>
    </div>
  );
}

function FacilitiesTab({ bank }: { bank: BloodBank }) {
  const allFacilities = [
    { name: "ক্রস-ম্যাচিং",         icon: "🔬", desc: "রক্ত সামঞ্জস্য পরীক্ষা" },
    { name: "কম্পোনেন্ট থেরাপি",    icon: "💉", desc: "রক্তের উপাদান আলাদা করা" },
    { name: "অ্যাফেরেসিস",           icon: "🩺", desc: "বিশেষ রক্তদান পদ্ধতি" },
    { name: "থ্যালাসেমিয়া সেবা",    icon: "❤️", desc: "থ্যালাসেমিয়া রোগীদের সেবা" },
    { name: "বোন ম্যারো",            icon: "🦴", desc: "অস্থিমজ্জা প্রতিস্থাপন" },
    { name: "স্বেচ্ছাসেবী রক্তদান", icon: "🤝", desc: "স্বেচ্ছাসেবী ডোনার কার্যক্রম" },
  ];

  return (
    <div className="space-y-3">
      {allFacilities.map((f) => {
        const available = bank.facilities.includes(f.name);
        return (
          <div key={f.name} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
            available ? "bg-green-50 border-green-100" : "bg-gray-50 border-gray-100 opacity-50"
          }`}>
            <span className="text-xl flex-shrink-0">{f.icon}</span>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${available ? "text-gray-900" : "text-gray-400"}`}>{f.name}</p>
              <p className="text-xs text-gray-400">{f.desc}</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              available ? "bg-green-500" : "bg-gray-200"
            }`}>
              {available ? (
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
