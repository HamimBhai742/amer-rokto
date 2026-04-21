"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2439,  suffix: "+",  label: "নিবন্ধিত ডোনার",      icon: "🩸", desc: "সক্রিয় স্বেচ্ছাসেবী" },
  { value: 64,    suffix: "",   label: "জেলায় সেবা",           icon: "📍", desc: "সারা বাংলাদেশে" },
  { value: 8750,  suffix: "+",  label: "সফল রক্তদান",          icon: "💉", desc: "২০১৮ থেকে এখন পর্যন্ত" },
  { value: 3,     suffix: "x",  label: "জীবন বাঁচে প্রতি দানে", icon: "❤️", desc: "একটি দানে তিনটি জীবন" },
  { value: 30,    suffix: " মিনিট", label: "গড় সাড়া সময়",    icon: "⚡", desc: "জরুরি অনুরোধে" },
  { value: 98,    suffix: "%",  label: "সন্তুষ্টির হার",        icon: "⭐", desc: "ব্যবহারকারীদের মতামত" },
];

function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

function StatCard({ value, suffix, label, icon, desc, index, active }: {
  value: number; suffix: string; label: string; icon: string; desc: string; index: number; active: boolean;
}) {
  const count = useCountUp(value, 1800, active);
  return (
    <div className="relative group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-red-50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 rounded-b-full bg-gradient-to-r from-[#CC0000] to-[#8B0000]" />
      <div className="text-3xl mb-3">{icon}</div>
      <div className="flex items-end gap-0.5 mb-1">
        <span className="text-3xl sm:text-4xl font-extrabold text-[#CC0000] tabular-nums leading-none">
          {active ? count.toLocaleString("bn-BD") : "০"}
        </span>
        <span className="text-base font-bold text-[#8B0000] mb-0.5">{suffix}</span>
      </div>
      <p className="text-sm font-bold text-gray-800 mb-1">{label}</p>
      <p className="text-xs text-gray-400">{desc}</p>
    </div>
  );
}

export default function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-gradient-to-b from-[#FFF5F5] to-white relative overflow-hidden">
      {/* Background ECG */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
          <polyline
            points="0,100 150,100 200,100 230,20 260,180 290,100 400,100 450,100 480,30 510,170 540,100 650,100 700,100 730,20 760,180 790,100 900,100 950,100 980,30 1010,170 1040,100 1150,100 1200,100"
            fill="none" stroke="#CC0000" strokeWidth="3"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-red-50 text-[#CC0000] text-sm font-semibold rounded-full border border-red-100 mb-3">
            আমাদের প্রভাব
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            সংখ্যায় <span className="text-[#CC0000]">আমার রক্ত</span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
            ২০১৮ সাল থেকে আমরা হাজারো মানুষের জীবন বাঁচাতে সাহায্য করে আসছি
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} index={i} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
