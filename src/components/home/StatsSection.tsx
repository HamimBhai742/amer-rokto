"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2439, label: "নিবন্ধিত ডোনার", suffix: "+", icon: "🩸" },
  { value: 64, label: "জেলায় সেবা", suffix: "", icon: "📍" },
  { value: 8, label: "রক্তের গ্রুপ", suffix: "", icon: "💉" },
  { value: 24, label: "ঘণ্টা সেবা", suffix: "/৭", icon: "⏰" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, label, suffix, icon, index, animate }: {
  value: number; label: string; suffix: string; icon: string; index: number; animate: boolean;
}) {
  const count = useCountUp(value, 1800, animate);
  return (
    <div
      className="relative group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white border border-red-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b-full bg-gradient-to-r from-[#CC0000] to-[#8B0000]" />

      <div className="text-3xl mb-3">{icon}</div>

      <div className="flex items-end gap-0.5">
        <span className="text-4xl sm:text-5xl font-extrabold text-[#CC0000] tabular-nums leading-none">
          {animate ? count.toLocaleString("bn-BD") : "০"}
        </span>
        <span className="text-xl font-bold text-[#8B0000] mb-1">{suffix}</span>
      </div>

      <p className="mt-2 text-sm sm:text-base font-semibold text-gray-600">{label}</p>

      {/* Hover blood drop decoration */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg width="12" height="16" viewBox="0 0 40 50" fill="none">
          <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="#CC0000" />
        </svg>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-white">
      {/* Top wave from hero */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B0000] via-[#CC0000] to-[#8B0000]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-red-50 text-[#CC0000] text-sm font-semibold rounded-full border border-red-100 mb-3">
            আমাদের পরিসংখ্যান
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            আমরা একসাথে <span className="text-[#CC0000]">শক্তিশালী</span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            প্রতিদিন হাজারো মানুষ আমার রক্তের মাধ্যমে জীবন বাঁচাচ্ছেন
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} index={i} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
