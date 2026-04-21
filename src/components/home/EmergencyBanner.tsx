"use client";

import Link from "next/link";

const urgentRequests = [
  { group: "O-", location: "ঢাকা মেডিকেল", time: "২ ঘণ্টা আগে", units: "২ ব্যাগ" },
  { group: "AB+", location: "চট্টগ্রাম জেনারেল", time: "৩ ঘণ্টা আগে", units: "১ ব্যাগ" },
  { group: "B-", location: "সিলেট ওসমানী", time: "৫ ঘণ্টা আগে", units: "৩ ব্যাগ" },
  { group: "A+", location: "রাজশাহী মেডিকেল", time: "১ ঘণ্টা আগে", units: "২ ব্যাগ" },
];

export default function EmergencyBanner() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0a0a0a] via-[#1a0000] to-[#2d0000] relative overflow-hidden">
      {/* Animated pulse rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-red-600/20"
            style={{
              width: `${i * 200}px`,
              height: `${i * 200}px`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: `ripple 3s ease-out ${i * 0.8}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ECG line */}
      <div className="absolute top-0 left-0 right-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 1200 40" className="w-full" preserveAspectRatio="none">
          <polyline
            points="0,20 100,20 130,20 150,4 170,36 190,20 250,20 280,20 300,6 320,34 340,20 400,20 430,20 450,4 470,36 490,20 550,20 580,20 600,6 620,34 640,20 700,20 730,20 750,4 770,36 790,20 850,20 880,20 900,6 920,34 940,20 1000,20 1030,20 1050,4 1070,36 1090,20 1200,20"
            fill="none" stroke="#FF4444" strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-900/50 border border-red-700/50 rounded-full px-4 py-1.5 text-red-300 text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            জরুরি রক্তের প্রয়োজন
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            এখনই <span className="text-red-400">সাহায্য</span> দরকার
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">
            নিচের রোগীরা এখন জরুরি রক্তের জন্য অপেক্ষা করছেন
          </p>
        </div>

        {/* Urgent request cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {urgentRequests.map((req, i) => (
            <div
              key={i}
              className="relative bg-white/5 backdrop-blur-sm border border-red-900/40 rounded-2xl p-5 hover:bg-white/10 hover:border-red-700/60 transition-all duration-300 group"
            >
              {/* Urgent badge */}
              <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                জরুরি
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#CC0000] to-[#8B0000] flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                  {req.group}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{req.location}</p>
                  <p className="text-gray-400 text-xs">{req.time}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-red-300 text-sm font-medium">{req.units} প্রয়োজন</span>
                <Link
                  href={`/donate?group=${req.group}`}
                  className="text-xs font-bold text-white bg-red-700 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors duration-200"
                >
                  সাহায্য করুন
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency CTA */}
        <div className="text-center">
          <Link
            href="/emergency"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-red-900/50 hover:-translate-y-1 transition-all duration-300 text-base"
          >
            <span className="animate-heartbeat text-xl">🩸</span>
            সব জরুরি অনুরোধ দেখুন
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
