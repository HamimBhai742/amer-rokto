"use client";

import Link from "next/link";
import { useState } from "react";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function HeroSection() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [district, setDistrict] = useState("");

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-[#8B0000] via-[#CC0000] to-[#FF2222]">

      {/* ── Animated background blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-[#8B0000]/40 blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-white/5 blur-3xl animate-pulse delay-500" />

        {/* Floating blood drops */}
        {[
          { top: "10%", left: "8%", size: 28, delay: "0s" },
          { top: "20%", left: "88%", size: 20, delay: "1.2s" },
          { top: "65%", left: "5%", size: 16, delay: "0.6s" },
          { top: "75%", left: "92%", size: 24, delay: "1.8s" },
          { top: "45%", left: "80%", size: 14, delay: "0.3s" },
        ].map((drop, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              top: drop.top,
              left: drop.left,
              animationDelay: drop.delay,
              animation: `floatDrop 4s ease-in-out ${drop.delay} infinite`,
            }}
          >
            <BloodDropSVG size={drop.size} color="white" />
          </div>
        ))}
      </div>

      {/* ── ECG / heartbeat line ── */}
      <div className="absolute bottom-20 left-0 right-0 opacity-15 pointer-events-none">
        <svg viewBox="0 0 1200 60" className="w-full" preserveAspectRatio="none">
          <polyline
            points="0,30 100,30 140,30 160,5 180,55 200,30 220,30 260,30 280,15 300,45 320,30 400,30 440,30 460,8 480,52 500,30 520,30 600,30 640,30 660,10 680,50 700,30 720,30 800,30 840,30 860,12 880,48 900,30 920,30 1000,30 1040,30 1060,6 1080,54 1100,30 1200,30"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* ── Bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text + Search */}
          <div className="text-white space-y-6 animate-slide-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              বাংলাদেশের সবচেয়ে বড় রক্তদান নেটওয়ার্ক
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              একটি রক্তদান
              <br />
              <span className="text-yellow-300 drop-shadow-lg">বাঁচাতে পারে</span>
              <br />
              একটি জীবন
            </h1>

            <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-lg">
              আমার রক্ত — বাংলাদেশের স্বেচ্ছাসেবী রক্তদাতাদের সাথে রক্তপ্রার্থীদের
              সংযুক্ত করার বিনামূল্যে প্ল্যাটফর্ম। ২৪/৭ সেবা, সারা দেশে।
            </p>

            {/* Quick Search Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 space-y-4 max-w-lg">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                🔍 দ্রুত ডোনার খুঁজুন
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/70 mb-1 block">রক্তের গ্রুপ</label>
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer"
                  >
                    <option value="" className="text-gray-800">গ্রুপ বেছে নিন</option>
                    {bloodGroups.map((g) => (
                      <option key={g} value={g} className="text-gray-800">{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/70 mb-1 block">জেলা</label>
                  <input
                    type="text"
                    placeholder="যেমন: ঢাকা"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>
              <Link
                href={`/find-blood?group=${selectedGroup}&district=${district}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#CC0000] font-bold rounded-xl hover:bg-yellow-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                ডোনার খুঁজুন
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/become-donor"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-300 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
              >
                🩸 ডোনার হিসেবে নিবন্ধন করুন
              </Link>
              <Link
                href="/request-blood"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/25 transition-all duration-200 text-sm"
              >
                রক্তের অনুরোধ করুন →
              </Link>
            </div>
          </div>

          {/* Right: Animated Blood Drop Illustration */}
          <div className="hidden lg:flex items-center justify-center animate-slide-right">
            <div className="relative w-80 h-80">
              {/* Ripple rings */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-white/20"
                  style={{
                    animation: `ripple 3s ease-out ${i * 0.8}s infinite`,
                  }}
                />
              ))}

              {/* Central blood drop */}
              <div className="absolute inset-0 flex items-center justify-center animate-blood-pulse">
                <svg viewBox="0 0 160 200" className="w-56 h-56 drop-shadow-2xl">
                  <defs>
                    <linearGradient id="heroDropGrad" x1="80" y1="0" x2="80" y2="200" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF6666" />
                      <stop offset="50%" stopColor="#FF2222" />
                      <stop offset="100%" stopColor="#660000" />
                    </linearGradient>
                    <filter id="dropShadow">
                      <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#8B0000" floodOpacity="0.5" />
                    </filter>
                  </defs>
                  <path
                    d="M80 8 C80 8 16 80 16 128 C16 166 44.8 192 80 192 C115.2 192 144 166 144 128 C144 80 80 8 80 8Z"
                    fill="url(#heroDropGrad)"
                    filter="url(#dropShadow)"
                  />
                  {/* Shine */}
                  <ellipse cx="58" cy="100" rx="16" ry="28" fill="rgba(255,255,255,0.2)" />
                  <ellipse cx="52" cy="88" rx="8" ry="12" fill="rgba(255,255,255,0.15)" />
                  {/* Text inside drop */}
                  <text x="80" y="135" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Arial">
                    আমার
                  </text>
                  <text x="80" y="158" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Arial">
                    রক্ত
                  </text>
                </svg>
              </div>

              {/* Orbiting blood group badges */}
              {[
                { group: "A+", angle: 0 },
                { group: "B+", angle: 90 },
                { group: "O+", angle: 180 },
                { group: "AB+", angle: 270 },
              ].map(({ group, angle }) => {
                const rad = (angle * Math.PI) / 180;
                const r = 148;
                const x = 50 + r * Math.cos(rad) * 0.5;
                const y = 50 + r * Math.sin(rad) * 0.5;
                return (
                  <div
                    key={group}
                    className="absolute w-12 h-12 rounded-full blood-badge flex items-center justify-center text-white text-xs font-extrabold shadow-lg"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
                  >
                    {group}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BloodDropSVG({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 40 50" fill="none">
      <path
        d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z"
        fill={color}
      />
    </svg>
  );
}
