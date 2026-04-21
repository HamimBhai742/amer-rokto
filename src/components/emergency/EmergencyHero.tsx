"use client";

import { useEffect, useState } from "react";

export default function EmergencyHero() {
  const [tick, setTick] = useState(0);

  // Pulse the alert every 2s
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#2d0000] to-[#0a0a0a] border-b border-red-900/30">
      {/* Animated radial pulse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={`${i}-${tick}`}
            className="absolute rounded-full border border-red-600/15"
            style={{
              width: `${i * 220}px`,
              height: `${i * 220}px`,
              animation: `ripple 4s ease-out ${i * 0.6}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ECG line top */}
      <div className="absolute top-0 left-0 right-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 1200 40" className="w-full" preserveAspectRatio="none">
          <polyline
            points="0,20 100,20 130,20 150,4 170,36 190,20 250,20 280,20 300,6 320,34 340,20 400,20 430,20 450,4 470,36 490,20 550,20 580,20 600,6 620,34 640,20 700,20 730,20 750,4 770,36 790,20 850,20 880,20 900,6 920,34 940,20 1000,20 1030,20 1050,4 1070,36 1090,20 1200,20"
            fill="none" stroke="#FF4444" strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Floating blood drops */}
      {[
        { top: "15%", left: "4%",  size: 22, delay: "0s"   },
        { top: "60%", left: "94%", size: 16, delay: "1.2s" },
        { top: "30%", left: "90%", size: 12, delay: "0.5s" },
        { top: "70%", left: "6%",  size: 14, delay: "1.8s" },
      ].map((d, i) => (
        <div key={i} className="absolute opacity-10 pointer-events-none"
          style={{ top: d.top, left: d.left, animation: `floatDrop 4s ease-in-out ${d.delay} infinite` }}>
          <svg width={d.size} height={d.size * 1.25} viewBox="0 0 40 50" fill="none">
            <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="#FF4444" />
          </svg>
        </div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        {/* Urgent badge */}
        <div className="inline-flex items-center gap-2 bg-red-900/60 border border-red-700/60 rounded-full px-5 py-2 text-red-300 text-sm font-bold mb-6 shadow-lg shadow-red-900/30">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
          জরুরি সেবা · ২৪ ঘণ্টা · ৭ দিন
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          জরুরি{" "}
          <span className="relative inline-block">
            <span className="text-red-400">রক্তের</span>
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
          </span>{" "}
          প্রয়োজন?
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          এখনই অনুরোধ পাঠান। আমাদের নেটওয়ার্কের হাজারো ডোনার আপনার পাশে আছেন।
          গড় সাড়া দেওয়ার সময় <span className="text-red-400 font-bold">৩০ মিনিটের কম।</span>
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          {[
            { value: "৩০ মিনিট", label: "গড় সাড়া সময়" },
            { value: "২৪/৭",     label: "সেবা সক্রিয়" },
            { value: "২৪৩৯+",    label: "প্রস্তুত ডোনার" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-red-400">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
  );
}
