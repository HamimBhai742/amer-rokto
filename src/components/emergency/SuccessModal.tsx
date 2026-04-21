"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { RequestFormData } from "./EmergencyClient";
import { groupColors } from "./emergencyData";

type Props = { data: RequestFormData; onClose: () => void };

export default function SuccessModal({ data, onClose }: Props) {
  const grad = groupColors[data.bloodGroup] ?? "from-red-500 to-red-700";

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-[#0f0f0f] border border-red-900/50 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-fade-up">
        {/* Top gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#8B0000] via-[#FF4444] to-[#8B0000]" />

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-6 pt-8 pb-6 text-center">
          {/* Animated success drop */}
          <div className="relative flex justify-center mb-5">
            {[1, 2].map((i) => (
              <div key={i} className="absolute rounded-full border border-red-600/20"
                style={{ width: `${i * 70}px`, height: `${i * 70}px`, top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)", animation: `ripple 2.5s ease-out ${i * 0.6}s infinite` }} />
            ))}
            <div className="relative w-16 h-20 animate-blood-pulse">
              <svg viewBox="0 0 40 50" fill="none" className="w-full h-full drop-shadow-xl">
                <defs>
                  <linearGradient id="smGrad" x1="20" y1="0" x2="20" y2="50" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF4444" />
                    <stop offset="100%" stopColor="#8B0000" />
                  </linearGradient>
                </defs>
                <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="url(#smGrad)" />
                <path d="M14 26 L18 30 L26 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-2">অনুরোধ পাঠানো হয়েছে!</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            আপনার জরুরি রক্তের অনুরোধ সফলভাবে পাঠানো হয়েছে।
            কাছের ডোনারদের এখনই SMS পাঠানো হচ্ছে।
          </p>

          {/* Request summary card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-extrabold text-base shadow-lg`}>
                {data.bloodGroup}
              </div>
              <div>
                <p className="text-white font-bold text-sm">{data.patientName}</p>
                <p className="text-gray-400 text-xs">{data.hospital}</p>
              </div>
              {data.urgent && (
                <span className="ml-auto text-xs font-bold bg-red-900/60 text-red-300 border border-red-700/40 px-2 py-0.5 rounded-full">
                  জরুরি
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <InfoRow icon="📍" label={data.district} />
              <InfoRow icon="🩸" label={`${data.units} ব্যাগ প্রয়োজন`} />
              <InfoRow icon="📋" label={data.reason} />
              <InfoRow icon="📱" label={data.contactPhone} />
            </div>
          </div>

          {/* What happens next */}
          <div className="bg-red-950/30 border border-red-900/30 rounded-2xl p-4 mb-5 text-left">
            <p className="text-red-300 text-xs font-bold mb-2 flex items-center gap-1.5">
              <span className="animate-pulse">⚡</span> এরপর কী হবে?
            </p>
            <ul className="space-y-1.5 text-xs text-gray-400">
              {[
                "কাছের ডোনারদের তাৎক্ষণিক SMS পাঠানো হচ্ছে",
                "ডোনার সাড়া দিলে আপনার নম্বরে কল করবেন",
                "গড়ে ৩০ মিনিটের মধ্যে সাড়া পাওয়া যায়",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5 flex-shrink-0">•</span>{t}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={onClose}
              className="flex-1 py-3 border border-white/10 text-gray-400 font-semibold rounded-xl hover:border-red-800/50 hover:text-white transition-all text-sm">
              বন্ধ করুন
            </button>
            <Link href="/find-blood"
              className="flex-1 py-3 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-900/40 transition-all text-sm flex items-center justify-center gap-1.5">
              🩸 ডোনার খুঁজুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-gray-400">
      <span className="flex-shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}
