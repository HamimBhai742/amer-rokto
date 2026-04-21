"use client";

import { useState } from "react";
import type { FormData } from "./BecomeDonorClient";
import { StepHeader, YesNoField, NavButtons } from "./FormParts";
import { bloodGroups } from "@/components/find-blood/data";

type Props = { form: FormData; update: (p: Partial<FormData>) => void; onNext: () => void; onBack: () => void };

const timeSlots = [
  "সকাল (৮টা–১২টা)",
  "দুপুর (১২টা–৪টা)",
  "বিকেল (৪টা–৮টা)",
  "যেকোনো সময়",
];

const groupColors: Record<string, string> = {
  "A+": "from-red-500 to-red-700", "A-": "from-red-600 to-red-800",
  "B+": "from-rose-500 to-rose-700", "B-": "from-rose-600 to-rose-800",
  "AB+": "from-red-700 to-red-900", "AB-": "from-red-800 to-red-950",
  "O+": "from-red-400 to-red-600", "O-": "from-red-500 to-red-700",
};

export default function Step3Medical({ form, update, onNext, onBack }: Props) {
  const [attempted, setAttempted] = useState(false);

  const isIneligible = form.chronicDisease === true || form.medications === true;

  const isValid =
    form.bloodGroup !== "" &&
    form.chronicDisease !== null &&
    form.medications !== null &&
    form.availableTime.length > 0;

  const handleNext = () => {
    setAttempted(true);
    if (!isValid || isIneligible) return;
    onNext();
  };

  const toggleTime = (slot: string) => {
    const current = form.availableTime;
    if (current.includes(slot)) {
      update({ availableTime: current.filter((s) => s !== slot) });
    } else {
      update({ availableTime: [...current, slot] });
    }
  };

  return (
    <div>
      <StepHeader
        step={3}
        title="চিকিৎসা তথ্য"
        subtitle="আপনার রক্তের গ্রুপ ও স্বাস্থ্য সংক্রান্ত তথ্য দিন। এটি সঠিক ডোনার মেলাতে সাহায্য করে।"
        icon="🩺"
      />

      <div className="px-6 sm:px-8 pb-8 space-y-6">
        {/* Blood Group */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2">
            🩸 রক্তের গ্রুপ *
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {bloodGroups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => update({ bloodGroup: g })}
                className={`h-12 rounded-xl font-extrabold text-sm transition-all duration-200 ${
                  form.bloodGroup === g
                    ? `bg-gradient-to-br ${groupColors[g]} text-white shadow-md scale-105 ring-2 ring-offset-1 ring-[#CC0000]`
                    : "bg-red-50 text-[#CC0000] border border-red-100 hover:bg-red-100"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          {attempted && !form.bloodGroup && (
            <p className="text-xs text-red-500 mt-1">রক্তের গ্রুপ বেছে নিন</p>
          )}
        </div>

        {/* Last donation + total */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">
              🕐 শেষ রক্তদানের তারিখ (ঐচ্ছিক)
            </label>
            <input
              type="date"
              value={form.lastDonation}
              onChange={(e) => update({ lastDonation: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-colors"
            />
            <p className="text-[10px] text-gray-400 mt-1">প্রথমবার হলে খালি রাখুন</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">
              🩸 মোট রক্তদানের সংখ্যা
            </label>
            <input
              type="number"
              min="0"
              value={form.totalDonations}
              onChange={(e) => update({ totalDonations: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] transition-colors"
            />
          </div>
        </div>

        {/* Medical questions */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-gray-700">স্বাস্থ্য সংক্রান্ত তথ্য</p>
          <YesNoField
            label="আপনার কি কোনো দীর্ঘমেয়াদী রোগ আছে? (ডায়াবেটিস, হৃদরোগ, উচ্চ রক্তচাপ ইত্যাদি)"
            value={form.chronicDisease}
            onChange={(v) => update({ chronicDisease: v })}
            yesGood={false}
            showError={attempted && form.chronicDisease === null}
          />
          <YesNoField
            label="আপনি কি নিয়মিত কোনো ওষুধ সেবন করেন?"
            value={form.medications}
            onChange={(v) => update({ medications: v })}
            yesGood={false}
            showError={attempted && form.medications === null}
          />
        </div>

        {/* Ineligible warning */}
        {isIneligible && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
            <span className="text-amber-500 text-xl flex-shrink-0">⚠️</span>
            <div>
              <p className="text-sm font-bold text-amber-800 mb-1">রক্তদানে সাময়িক বাধা</p>
              <p className="text-xs text-amber-700">
                দীর্ঘমেয়াদী রোগ বা নিয়মিত ওষুধ সেবনের ক্ষেত্রে রক্তদানের আগে ডাক্তারের পরামর্শ নিন।
                আপনি তবুও নিবন্ধন করতে পারবেন, তবে রক্তদানের আগে যাচাই করা হবে।
              </p>
            </div>
          </div>
        )}

        {/* Emergency availability */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-bold text-gray-700">জরুরি রক্তদানে রাজি?</p>
              <p className="text-xs text-gray-400">জরুরি প্রয়োজনে কি আপনাকে যোগাযোগ করা যাবে?</p>
            </div>
            <button
              type="button"
              onClick={() => update({ willingToEmergency: !form.willingToEmergency })}
              className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                form.willingToEmergency ? "bg-[#CC0000]" : "bg-gray-200"
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                form.willingToEmergency ? "left-7" : "left-1"
              }`} />
            </button>
          </div>
        </div>

        {/* Available time */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2">
            ⏰ কোন সময়ে রক্ত দিতে পারবেন? *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => toggleTime(slot)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border-2 transition-all duration-200 text-left ${
                  form.availableTime.includes(slot)
                    ? "border-[#CC0000] bg-red-50 text-[#CC0000]"
                    : "border-gray-200 text-gray-500 hover:border-red-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded flex items-center justify-center border-2 flex-shrink-0 ${
                    form.availableTime.includes(slot) ? "border-[#CC0000] bg-[#CC0000]" : "border-gray-300"
                  }`}>
                    {form.availableTime.includes(slot) && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {slot}
                </span>
              </button>
            ))}
          </div>
          {attempted && form.availableTime.length === 0 && (
            <p className="text-xs text-red-500 mt-1">অন্তত একটি সময় বেছে নিন</p>
          )}
        </div>

        <NavButtons onNext={handleNext} onBack={onBack} nextLabel="পরবর্তী ধাপ →" />
      </div>
    </div>
  );
}
