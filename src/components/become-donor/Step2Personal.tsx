"use client";

import { useState } from "react";
import type { FormData } from "./BecomeDonorClient";
import { StepHeader, InputField, SelectField, NavButtons } from "./FormParts";
import { districts, upazilas } from "@/components/find-blood/data";

type Props = { form: FormData; update: (p: Partial<FormData>) => void; onNext: () => void; onBack: () => void };

export default function Step2Personal({ form, update, onNext, onBack }: Props) {
  const [attempted, setAttempted] = useState(false);

  const errors = {
    fullName: attempted && !form.fullName.trim() ? "পূর্ণ নাম দিন" : "",
    phone: attempted && !/^01[3-9]\d{8}$/.test(form.phone) ? "সঠিক মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)" : "",
    email: attempted && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "সঠিক ইমেইল দিন" : "",
    gender: attempted && !form.gender ? "লিঙ্গ বেছে নিন" : "",
    dob: attempted && !form.dob ? "জন্ম তারিখ দিন" : "",
    district: attempted && !form.district ? "জেলা বেছে নিন" : "",
  };

  const isValid = form.fullName.trim() && /^01[3-9]\d{8}$/.test(form.phone) && form.gender && form.dob && form.district;

  const handleNext = () => {
    setAttempted(true);
    if (!isValid) return;
    onNext();
  };

  const availableUpazilas = form.district ? (upazilas[form.district] ?? []) : [];

  return (
    <div>
      <StepHeader
        step={2}
        title="ব্যক্তিগত তথ্য"
        subtitle="আপনার পরিচয় ও যোগাযোগের তথ্য দিন। এই তথ্য শুধুমাত্র রক্তদানের উদ্দেশ্যে ব্যবহার হবে।"
        icon="👤"
      />

      <div className="px-6 sm:px-8 pb-8 space-y-5">
        {/* Name */}
        <InputField
          label="পূর্ণ নাম *"
          placeholder="আপনার পূর্ণ নাম লিখুন"
          value={form.fullName}
          onChange={(v) => update({ fullName: v })}
          error={errors.fullName}
          icon="👤"
        />

        {/* Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="মোবাইল নম্বর *"
            placeholder="01XXXXXXXXX"
            value={form.phone}
            onChange={(v) => update({ phone: v })}
            error={errors.phone}
            icon="📱"
            type="tel"
          />
          <InputField
            label="ইমেইল (ঐচ্ছিক)"
            placeholder="example@email.com"
            value={form.email}
            onChange={(v) => update({ email: v })}
            error={errors.email}
            icon="✉️"
            type="email"
          />
        </div>

        {/* Gender + DOB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">লিঙ্গ *</label>
            <div className="flex gap-2">
              {["পুরুষ", "মহিলা", "অন্যান্য"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => update({ gender: g })}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                    form.gender === g
                      ? "border-[#CC0000] bg-red-50 text-[#CC0000]"
                      : "border-gray-200 text-gray-500 hover:border-red-200 hover:text-[#CC0000]"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
          </div>

          <InputField
            label="জন্ম তারিখ *"
            type="date"
            placeholder=""
            value={form.dob}
            onChange={(v) => update({ dob: v })}
            error={errors.dob}
            icon="🎂"
          />
        </div>

        {/* NID */}
        <InputField
          label="জাতীয় পরিচয়পত্র নম্বর (ঐচ্ছিক)"
          placeholder="NID নম্বর"
          value={form.nid}
          onChange={(v) => update({ nid: v })}
          error=""
          icon="🪪"
          hint="পরিচয় যাচাইয়ের জন্য ব্যবহার হবে"
        />

        {/* District + Upazila */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="জেলা *"
            value={form.district}
            onChange={(v) => { update({ district: v, upazila: "" }); }}
            options={districts}
            placeholder="জেলা বেছে নিন"
            error={errors.district}
            icon="📍"
          />
          {availableUpazilas.length > 0 && (
            <SelectField
              label="উপজেলা / থানা"
              value={form.upazila}
              onChange={(v) => update({ upazila: v })}
              options={availableUpazilas}
              placeholder="উপজেলা বেছে নিন"
              error=""
              icon="🏘️"
            />
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1.5">
            <span className="mr-1">🏠</span> বিস্তারিত ঠিকানা (ঐচ্ছিক)
          </label>
          <textarea
            rows={2}
            placeholder="রাস্তা, এলাকা, বাড়ি নম্বর..."
            value={form.address}
            onChange={(e) => update({ address: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-colors resize-none"
          />
        </div>

        {/* Privacy note */}
        <div className="flex gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3">
          <span className="text-blue-500 flex-shrink-0">🔒</span>
          <p className="text-xs text-blue-700">
            আপনার ব্যক্তিগত তথ্য সম্পূর্ণ সুরক্ষিত। শুধুমাত্র রক্তের প্রয়োজনে আপনার সাথে যোগাযোগ করা হবে।
          </p>
        </div>

        <NavButtons onNext={handleNext} onBack={onBack} nextLabel="পরবর্তী ধাপ →" />
      </div>
    </div>
  );
}
