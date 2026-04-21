"use client";

import { useState } from "react";
import type { FormData } from "./BecomeDonorClient";
import { StepHeader, YesNoField, InputField, NavButtons, IneligibleBanner } from "./FormParts";

type Props = { form: FormData; update: (p: Partial<FormData>) => void; onNext: () => void };

const criteria = [
  { key: "healthyToday",   label: "আপনি কি আজ সুস্থ অনুভব করছেন?",                    yesGood: true  },
  { key: "recentIllness",  label: "গত ৩ মাসে কি কোনো বড় অসুস্থতা হয়েছে?",            yesGood: false },
  { key: "recentSurgery",  label: "গত ৬ মাসে কি কোনো অস্ত্রোপচার হয়েছে?",             yesGood: false },
  { key: "recentTattoo",   label: "গত ৬ মাসে কি ট্যাটু বা শরীরে ছিদ্র করা হয়েছে?",   yesGood: false },
  { key: "pregnant",       label: "আপনি কি গর্ভবতী বা সম্প্রতি সন্তান প্রসব করেছেন?", yesGood: false },
] as const;

export default function Step1Eligibility({ form, update, onNext }: Props) {
  const [attempted, setAttempted] = useState(false);

  const isIneligible =
    form.healthyToday === false ||
    form.recentIllness === true ||
    form.recentSurgery === true ||
    form.recentTattoo === true ||
    form.pregnant === true ||
    (form.age !== "" && (parseInt(form.age) < 18 || parseInt(form.age) > 60)) ||
    (form.weight !== "" && parseInt(form.weight) < 50);

  const allAnswered =
    form.healthyToday !== null &&
    form.recentIllness !== null &&
    form.recentSurgery !== null &&
    form.recentTattoo !== null &&
    form.pregnant !== null &&
    form.age !== "" &&
    form.weight !== "";

  const handleNext = () => {
    setAttempted(true);
    if (!allAnswered || isIneligible) return;
    onNext();
  };

  return (
    <div>
      <StepHeader
        step={1}
        title="যোগ্যতা যাচাই"
        subtitle="রক্তদানের আগে কিছু প্রাথমিক শর্ত পূরণ করতে হয়। নিচের প্রশ্নগুলোর সৎ উত্তর দিন।"
        icon="✅"
      />

      <div className="px-6 sm:px-8 pb-8 space-y-6">
        {/* Age & Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="বয়স (বছর)"
            type="number"
            placeholder="যেমন: ২৫"
            value={form.age}
            onChange={(v) => update({ age: v })}
            error={attempted && form.age === "" ? "বয়স দিন" :
              attempted && (parseInt(form.age) < 18 || parseInt(form.age) > 60) ? "বয়স ১৮–৬০ বছরের মধ্যে হতে হবে" : ""}
            hint="১৮ থেকে ৬০ বছর"
            icon="🎂"
          />
          <InputField
            label="ওজন (কেজি)"
            type="number"
            placeholder="যেমন: ৬০"
            value={form.weight}
            onChange={(v) => update({ weight: v })}
            error={attempted && form.weight === "" ? "ওজন দিন" :
              attempted && parseInt(form.weight) < 50 ? "ন্যূনতম ৫০ কেজি হতে হবে" : ""}
            hint="ন্যূনতম ৫০ কেজি"
            icon="⚖️"
          />
        </div>

        {/* Yes/No criteria */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-gray-700">স্বাস্থ্য সংক্রান্ত প্রশ্ন</p>
          {criteria.map((c) => (
            <YesNoField
              key={c.key}
              label={c.label}
              value={form[c.key] as boolean | null}
              onChange={(v) => update({ [c.key]: v })}
              yesGood={c.yesGood}
              showError={attempted && form[c.key] === null}
            />
          ))}
        </div>

        {/* Ineligible banner */}
        {isIneligible && allAnswered && <IneligibleBanner />}

        {/* Eligibility checklist */}
        {!isIneligible && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-green-700 mb-2">✅ রক্তদানের সাধারণ শর্তাবলী</p>
            <ul className="space-y-1.5 text-xs text-green-700">
              {["বয়স ১৮–৬০ বছর", "ওজন ন্যূনতম ৫০ কেজি", "সুস্থ ও সক্রিয়", "শেষ রক্তদানের ৯০ দিন পর", "হিমোগ্লোবিন স্বাভাবিক"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        <NavButtons onNext={handleNext} nextLabel="পরবর্তী ধাপ →" />
      </div>
    </div>
  );
}
