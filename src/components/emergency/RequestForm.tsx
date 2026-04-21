"use client";

import { useState } from "react";
import { bloodGroups, districts } from "@/components/find-blood/data";
import { hospitals, reasons, groupColors } from "./emergencyData";
import type { RequestFormData } from "./EmergencyClient";

type Props = { onSubmit: (data: RequestFormData) => void };

const initialForm: RequestFormData = {
  patientName: "", bloodGroup: "", units: "1",
  hospital: "", district: "", contactName: "",
  contactPhone: "", reason: "", additionalInfo: "",
  urgent: true,
};

export default function RequestForm({ onSubmit }: Props) {
  const [form, setForm] = useState<RequestFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof RequestFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof RequestFormData>(k: K, v: RequestFormData[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Partial<Record<keyof RequestFormData, string>> = {};
    if (!form.patientName.trim())                       e.patientName   = "রোগীর নাম দিন";
    if (!form.bloodGroup)                               e.bloodGroup    = "রক্তের গ্রুপ বেছে নিন";
    if (!form.hospital.trim())                          e.hospital      = "হাসপাতালের নাম দিন";
    if (!form.district)                                 e.district      = "জেলা বেছে নিন";
    if (!form.contactName.trim())                       e.contactName   = "যোগাযোগকারীর নাম দিন";
    if (!/^01[3-9]\d{8}$/.test(form.contactPhone))     e.contactPhone  = "সঠিক মোবাইল নম্বর দিন";
    if (!form.reason)                                   e.reason        = "কারণ বেছে নিন";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); onSubmit(form); }, 1200);
  };

  const gradColor = form.bloodGroup ? groupColors[form.bloodGroup] : null;

  return (
    <div className="bg-[#111111] border border-red-900/40 rounded-3xl overflow-hidden shadow-2xl shadow-red-900/20">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#8B0000] via-[#CC0000] to-[#8B0000] px-6 sm:px-8 py-5 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 800 60" className="w-full h-full" preserveAspectRatio="none">
            <polyline points="0,30 80,30 100,30 115,8 130,52 145,30 200,30 220,30 235,10 250,50 265,30 320,30 340,30 355,8 370,52 385,30 440,30 460,30 475,10 490,50 505,30 560,30 580,30 595,8 610,52 625,30 680,30 700,30 715,10 730,50 745,30 800,30"
              fill="none" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-xl flex-shrink-0 animate-heartbeat">
            🚨
          </div>
          <div>
            <h2 className="text-white font-extrabold text-lg">জরুরি রক্তের অনুরোধ</h2>
            <p className="text-white/70 text-xs">সব তারকা (*) চিহ্নিত তথ্য আবশ্যক</p>
          </div>
          {/* Urgent toggle */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-white/60 text-xs hidden sm:block">অতি জরুরি</span>
            <button
              type="button"
              onClick={() => set("urgent", !form.urgent)}
              className={`w-11 h-6 rounded-full transition-all duration-300 relative ${form.urgent ? "bg-red-400" : "bg-white/20"}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${form.urgent ? "left-6" : "left-1"}`} />
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-7 space-y-6">
        {/* Blood group — prominent */}
        <div>
          <label className="block text-xs font-bold text-red-400 uppercase tracking-wider mb-3">
            🩸 রক্তের গ্রুপ *
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {bloodGroups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => set("bloodGroup", g)}
                className={`h-12 rounded-xl font-extrabold text-sm transition-all duration-200 ${
                  form.bloodGroup === g
                    ? `bg-gradient-to-br ${groupColors[g]} text-white shadow-lg shadow-red-900/40 scale-105 ring-2 ring-red-500/50 ring-offset-1 ring-offset-[#111]`
                    : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-red-800/50"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          {errors.bloodGroup && <ErrMsg msg={errors.bloodGroup} />}
        </div>

        {/* Patient + units */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <DarkInput
              label="রোগীর নাম *"
              placeholder="রোগীর পূর্ণ নাম"
              value={form.patientName}
              onChange={(v) => set("patientName", v)}
              error={errors.patientName}
              icon="🏥"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5">
              <span className="mr-1">🩸</span>ব্যাগের সংখ্যা *
            </label>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => set("units", String(Math.max(1, parseInt(form.units) - 1)))}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-red-900/40 hover:border-red-700/50 transition-all flex items-center justify-center text-lg">
                −
              </button>
              <div className={`flex-1 h-10 rounded-xl flex items-center justify-center font-extrabold text-lg text-white border ${
                gradColor ? `bg-gradient-to-br ${gradColor} border-transparent` : "bg-white/5 border-white/10"
              }`}>
                {form.units}
              </div>
              <button type="button" onClick={() => set("units", String(Math.min(10, parseInt(form.units) + 1)))}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-red-900/40 hover:border-red-700/50 transition-all flex items-center justify-center text-lg">
                +
              </button>
            </div>
          </div>
        </div>

        {/* Hospital + District */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DarkSelect
            label="হাসপাতাল *"
            value={form.hospital}
            onChange={(v) => set("hospital", v)}
            options={hospitals}
            placeholder="হাসপাতাল বেছে নিন"
            error={errors.hospital}
            icon="🏥"
          />
          <DarkSelect
            label="জেলা *"
            value={form.district}
            onChange={(v) => set("district", v)}
            options={districts}
            placeholder="জেলা বেছে নিন"
            error={errors.district}
            icon="📍"
          />
        </div>

        {/* Reason */}
        <DarkSelect
          label="রক্তের প্রয়োজনের কারণ *"
          value={form.reason}
          onChange={(v) => set("reason", v)}
          options={reasons}
          placeholder="কারণ বেছে নিন"
          error={errors.reason}
          icon="📋"
        />

        {/* Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DarkInput
            label="যোগাযোগকারীর নাম *"
            placeholder="আপনার নাম"
            value={form.contactName}
            onChange={(v) => set("contactName", v)}
            error={errors.contactName}
            icon="👤"
          />
          <DarkInput
            label="মোবাইল নম্বর *"
            placeholder="01XXXXXXXXX"
            value={form.contactPhone}
            onChange={(v) => set("contactPhone", v)}
            error={errors.contactPhone}
            icon="📱"
            type="tel"
          />
        </div>

        {/* Additional info */}
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1.5">
            <span className="mr-1">📝</span>অতিরিক্ত তথ্য (ঐচ্ছিক)
          </label>
          <textarea
            rows={3}
            placeholder="রোগীর অবস্থা, বিশেষ নির্দেশনা বা অন্য কোনো তথ্য..."
            value={form.additionalInfo}
            onChange={(e) => set("additionalInfo", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-700/40 focus:border-red-700/50 transition-colors resize-none"
          />
        </div>

        {/* Urgent notice */}
        {form.urgent && (
          <div className="flex gap-3 bg-red-950/60 border border-red-800/50 rounded-xl p-3">
            <span className="text-red-400 animate-pulse flex-shrink-0">⚡</span>
            <p className="text-xs text-red-300">
              অতি জরুরি হিসেবে চিহ্নিত। আপনার অনুরোধ সর্বোচ্চ অগ্রাধিকারে পাঠানো হবে এবং কাছের সব ডোনারকে তাৎক্ষণিক SMS পাঠানো হবে।
            </p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-extrabold text-base transition-all duration-300 ${
            submitting
              ? "bg-red-900/50 text-red-300 cursor-not-allowed"
              : "bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white hover:shadow-2xl hover:shadow-red-900/50 hover:-translate-y-0.5 active:translate-y-0"
          }`}
        >
          {submitting ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              অনুরোধ পাঠানো হচ্ছে...
            </>
          ) : (
            <>
              <span className="text-xl animate-heartbeat">🚨</span>
              জরুরি অনুরোধ পাঠান
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

/* ── Dark-themed field primitives ── */
function DarkInput({ label, placeholder, value, onChange, error, icon, type = "text" }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; error?: string; icon?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-400 mb-1.5">
        {icon && <span className="mr-1">{icon}</span>}{label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-600/60 focus:ring-red-700/30"
            : "border-white/10 focus:ring-red-700/30 focus:border-red-700/50"
        }`}
      />
      {error && <ErrMsg msg={error} />}
    </div>
  );
}

function DarkSelect({ label, value, onChange, options, placeholder, error, icon }: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder: string; error?: string; icon?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-400 mb-1.5">
        {icon && <span className="mr-1">{icon}</span>}{label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:ring-2 transition-colors cursor-pointer pr-8 ${
            error
              ? "border-red-600/60 focus:ring-red-700/30"
              : "border-white/10 focus:ring-red-700/30 focus:border-red-700/50"
          }`}
        >
          <option value="" className="bg-[#1a0000] text-gray-400">{placeholder}</option>
          {options.map((o) => <option key={o} value={o} className="bg-[#1a0000] text-gray-200">{o}</option>)}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && <ErrMsg msg={error} />}
    </div>
  );
}

function ErrMsg({ msg }: { msg: string }) {
  return (
    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
      <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
      {msg}
    </p>
  );
}
