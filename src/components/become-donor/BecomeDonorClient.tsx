"use client";

import { useState } from "react";
import DonorHero from "./DonorHero";
import StepIndicator from "./StepIndicator";
import Step1Eligibility from "./Step1Eligibility";
import Step2Personal from "./Step2Personal";
import Step3Medical from "./Step3Medical";
import Step4Confirm from "./Step4Confirm";
import SuccessScreen from "./SuccessScreen";
import WhyDonateAside from "./WhyDonateAside";

export type FormData = {
  /* eligibility */
  age: string;
  weight: string;
  healthyToday: boolean | null;
  recentIllness: boolean | null;
  recentSurgery: boolean | null;
  recentTattoo: boolean | null;
  pregnant: boolean | null;
  /* personal */
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  dob: string;
  nid: string;
  district: string;
  upazila: string;
  address: string;
  /* medical */
  bloodGroup: string;
  lastDonation: string;
  totalDonations: string;
  chronicDisease: boolean | null;
  medications: boolean | null;
  willingToEmergency: boolean;
  availableTime: string[];
  /* consent */
  agreeTerms: boolean;
  agreeContact: boolean;
};

const initialForm: FormData = {
  age: "", weight: "", healthyToday: null, recentIllness: null,
  recentSurgery: null, recentTattoo: null, pregnant: null,
  fullName: "", phone: "", email: "", gender: "", dob: "", nid: "",
  district: "", upazila: "", address: "",
  bloodGroup: "", lastDonation: "", totalDonations: "0",
  chronicDisease: null, medications: null,
  willingToEmergency: true, availableTime: [],
  agreeTerms: false, agreeContact: false,
};

export const STEPS = [
  { id: 1, label: "যোগ্যতা", icon: "✅" },
  { id: 2, label: "ব্যক্তিগত", icon: "👤" },
  { id: 3, label: "চিকিৎসা", icon: "🩺" },
  { id: 4, label: "নিশ্চিত", icon: "📋" },
];

export default function BecomeDonorClient() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (patch: Partial<FormData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));
  const submit = () => setSubmitted(true);

  if (submitted) return <SuccessScreen form={form} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <DonorHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Step indicator */}
        <StepIndicator currentStep={step} steps={STEPS} />

        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
          {/* Form area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-3xl border border-red-50 shadow-sm overflow-hidden">
              {step === 1 && <Step1Eligibility form={form} update={update} onNext={next} />}
              {step === 2 && <Step2Personal form={form} update={update} onNext={next} onBack={back} />}
              {step === 3 && <Step3Medical form={form} update={update} onNext={next} onBack={back} />}
              {step === 4 && <Step4Confirm form={form} update={update} onBack={back} onSubmit={submit} />}
            </div>
          </div>

          {/* Aside */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <WhyDonateAside currentStep={step} />
          </aside>
        </div>
      </div>
    </div>
  );
}
