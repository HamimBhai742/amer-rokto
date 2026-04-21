"use client";

import { useState } from "react";
import type { FormData } from "./BecomeDonorClient";
import { NavButtons } from "./FormParts";

type Props = { form: FormData; update: (p: Partial<FormData>) => void; onBack: () => void; onSubmit: () => void };

const groupColors: Record<string, string> = {
  "A+": "from-red-500 to-red-700", "A-": "from-red-600 to-red-800",
  "B+": "from-rose-500 to-rose-700", "B-": "from-rose-600 to-rose-800",
  "AB+": "from-red-700 to-red-900", "AB-": "from-red-800 to-red-950",
  "O+": "from-red-400 to-red-600", "O-": "from-red-500 to-red-700",
};

export default function Step4Confirm({ form, update, onBack, onSubmit }: Props) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!form.agreeTerms || !form.agreeContact) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); onSubmit(); }, 1500);
  };

  const gradColor = groupColors[form.bloodGroup] ?? "from-red-500 to-red-700";

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFF5F5] to-white border-b border-red-50 px-6 sm:px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CC0000] to-[#8B0000] flex items-center justify-center text-white text-lg shadow-md">
            📋
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">তথ্য নিশ্চিত করুন</h2>
            <p className="text-xs text-gray-500">সাবমিট করার আগে আপনার তথ্য একবার দেখুন</p>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 pb-8 pt-6 space-y-5">
        {/* Profile preview card */}
        <div className="relative bg-gradient-to-br from-[#8B0000] via-[#CC0000] to-[#FF2222] rounded-2xl p-5 text-white overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="100" height="120" viewBox="0 0 40 50" fill="none">
              <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="white" />
            </svg>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-white font-extrabold text-xl">
              {form.fullName.split(" ").map((w) => w[0]).slice(0, 2).join("") || "?"}
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-lg">{form.fullName || "—"}</h3>
              <p className="text-white/75 text-sm">{form.gender} · {form.district}</p>
              <p className="text-white/60 text-xs mt-0.5">{form.phone}</p>
            </div>
            {form.bloodGroup && (
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradColor} border-2 border-white/30 flex items-center justify-center text-white font-extrabold text-xl shadow-lg`}>
                {form.bloodGroup}
              </div>
            )}
          </div>
        </div>

        {/* Summary sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SummarySection title="ব্যক্তিগত তথ্য" icon="👤">
            <SummaryRow label="নাম" value={form.fullName} />
            <SummaryRow label="মোবাইল" value={form.phone} />
            <SummaryRow label="ইমেইল" value={form.email || "—"} />
            <SummaryRow label="জন্ম তারিখ" value={form.dob || "—"} />
            <SummaryRow label="জেলা" value={`${form.district}${form.upazila ? `, ${form.upazila}` : ""}`} />
          </SummarySection>

          <SummarySection title="চিকিৎসা তথ্য" icon="🩺">
            <SummaryRow label="রক্তের গ্রুপ" value={form.bloodGroup} highlight />
            <SummaryRow label="মোট দান" value={`${form.totalDonations} বার`} />
            <SummaryRow label="শেষ দান" value={form.lastDonation || "প্রথমবার"} />
            <SummaryRow label="জরুরি দান" value={form.willingToEmergency ? "রাজি ✓" : "না"} />
            <SummaryRow label="সময়" value={form.availableTime.join(", ") || "—"} />
          </SummarySection>
        </div>

        {/* Consent checkboxes */}
        <div className="space-y-3 pt-2">
          <p className="text-sm font-bold text-gray-700">সম্মতি ও শর্তাবলী</p>

          <ConsentCheck
            checked={form.agreeTerms}
            onChange={(v) => update({ agreeTerms: v })}
            label={
              <>
                আমি <a href="/terms" className="text-[#CC0000] underline">শর্তাবলী</a> ও{" "}
                <a href="/privacy" className="text-[#CC0000] underline">গোপনীয়তা নীতি</a> পড়েছি এবং সম্মত আছি।
              </>
            }
          />
          <ConsentCheck
            checked={form.agreeContact}
            onChange={(v) => update({ agreeContact: v })}
            label="রক্তের প্রয়োজনে আমার সাথে যোগাযোগ করার অনুমতি দিচ্ছি।"
          />
        </div>

        {/* Important note */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex gap-2">
          <span className="text-[#CC0000] flex-shrink-0">🩸</span>
          <p className="text-xs text-gray-600">
            নিবন্ধনের পর আপনার তথ্য যাচাই করা হবে। যাচাই সম্পন্ন হলে আপনি ডোনার তালিকায় যুক্ত হবেন।
          </p>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center gap-2 px-5 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:border-red-200 hover:text-[#CC0000] transition-all duration-200 text-sm"
          >
            ← পেছনে যান
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!form.agreeTerms || !form.agreeContact || submitting}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              form.agreeTerms && form.agreeContact && !submitting
                ? "bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {submitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                নিবন্ধন হচ্ছে...
              </>
            ) : (
              <>
                <span className="animate-heartbeat">🩸</span>
                নিবন্ধন সম্পন্ন করুন
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function SummarySection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <span>{icon}</span>{title}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-gray-400 flex-shrink-0">{label}</span>
      <span className={`text-xs font-semibold text-right truncate ${highlight ? "text-[#CC0000] font-extrabold text-sm" : "text-gray-700"}`}>
        {value || "—"}
      </span>
    </div>
  );
}

function ConsentCheck({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all duration-200 ${
        checked ? "border-[#CC0000] bg-red-50" : "border-gray-200 hover:border-red-200"
      }`}
    >
      <div className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 mt-0.5 transition-all duration-200 ${
        checked ? "border-[#CC0000] bg-[#CC0000]" : "border-gray-300"
      }`}>
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-xs text-gray-600 leading-relaxed">{label}</span>
    </button>
  );
}
