"use client";

import { useState } from "react";
import EmergencyHero from "./EmergencyHero";
import RequestForm from "./RequestForm";
import ActiveRequests from "./ActiveRequests";
import HotlineSection from "./HotlineSection";
import EmergencyTips from "./EmergencyTips";
import SuccessModal from "./SuccessModal";

export type RequestFormData = {
  patientName: string;
  bloodGroup: string;
  units: string;
  hospital: string;
  district: string;
  contactName: string;
  contactPhone: string;
  reason: string;
  additionalInfo: string;
  urgent: boolean;
};

export default function EmergencyClient() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<RequestFormData | null>(null);

  const handleSubmit = (data: RequestFormData) => {
    setSubmittedData(data);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a0000] to-[#0a0a0a]">
      <EmergencyHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            <RequestForm onSubmit={handleSubmit} />
            <EmergencyTips />
          </div>

          {/* Right: Active requests + hotline */}
          <div className="space-y-6">
            <HotlineSection />
            <ActiveRequests />
          </div>
        </div>
      </div>

      {showSuccess && submittedData && (
        <SuccessModal data={submittedData} onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}
