"use client";

import { useEffect, useRef, useState } from "react";

const events = [
  {
    year: "২০১৭",
    month: "নভেম্বর",
    title: "অনুপ্রেরণার মুহূর্ত",
    desc: "প্রতিষ্ঠাতার মায়ের জরুরি অস্ত্রোপচারে রক্ত না পাওয়ার অভিজ্ঞতা থেকে আমার রক্তের ধারণার জন্ম।",
    icon: "💡",
    color: "bg-yellow-500",
  },
  {
    year: "২০১৮",
    month: "মার্চ",
    title: "আনুষ্ঠানিক যাত্রা শুরু",
    desc: "মাত্র ৫০ জন স্বেচ্ছাসেবী ডোনার নিয়ে ঢাকায় আমার রক্তের আনুষ্ঠানিক কার্যক্রম শুরু।",
    icon: "🚀",
    color: "bg-[#CC0000]",
  },
  {
    year: "২০১৯",
    month: "জানুয়ারি",
    title: "বিভাগীয় সম্প্রসারণ",
    desc: "ঢাকার বাইরে চট্টগ্রাম, সিলেট ও রাজশাহীতে কার্যক্রম বিস্তার। ডোনার সংখ্যা ৫০০ ছাড়িয়ে যায়।",
    icon: "📍",
    color: "bg-blue-600",
  },
  {
    year: "২০২০",
    month: "এপ্রিল",
    title: "কোভিড-১৯ সংকটে সেবা",
    desc: "মহামারীর সময়ে কোভিড রোগীদের জন্য প্লাজমা ডোনার নেটওয়ার্ক গড়ে তোলা। বিশেষ সেবা চালু।",
    icon: "🦠",
    color: "bg-purple-600",
  },
  {
    year: "২০২১",
    month: "আগস্ট",
    title: "১০০০ ডোনার মাইলফলক",
    desc: "এক হাজার সক্রিয় ডোনারের মাইলফলক অর্জন। মোবাইল অ্যাপ বেটা ভার্সন লঞ্চ।",
    icon: "🎯",
    color: "bg-green-600",
  },
  {
    year: "২০২২",
    month: "ডিসেম্বর",
    title: "জাতীয় পুরস্কার অর্জন",
    desc: "সামাজিক উদ্যোগ বিভাগে জাতীয় ডিজিটাল বাংলাদেশ পুরস্কার অর্জন। আন্তর্জাতিক স্বীকৃতি।",
    icon: "🏆",
    color: "bg-yellow-600",
  },
  {
    year: "২০২৩",
    month: "জুন",
    title: "ব্লাড ব্যাংক নেটওয়ার্ক",
    desc: "সারা দেশের ১০০+ ব্লাড ব্যাংকের সাথে অংশীদারিত্ব। রিয়েল-টাইম স্টক ট্র্যাকিং চালু।",
    icon: "🏦",
    color: "bg-[#8B0000]",
  },
  {
    year: "২০২৪",
    month: "মার্চ",
    title: "৬৪ জেলায় পূর্ণ কভারেজ",
    desc: "বাংলাদেশের সব ৬৪টি জেলায় সক্রিয় ডোনার নেটওয়ার্ক সম্পন্ন। ২৪৩৯+ ডোনার সক্রিয়।",
    icon: "🇧🇩",
    color: "bg-[#CC0000]",
  },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF5F5] to-white relative overflow-hidden">
      {/* Decorative large drop */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <svg width="300" height="375" viewBox="0 0 40 50" fill="none">
          <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="#CC0000" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-red-50 text-[#CC0000] text-sm font-semibold rounded-full border border-red-100 mb-3">
            আমাদের যাত্রা
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            ইতিহাসের <span className="text-[#CC0000]">পাতায়</span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
            ২০১৭ থেকে আজ পর্যন্ত আমাদের অগ্রযাত্রার গল্প
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#CC0000] via-[#FF4444] to-[#CC0000] opacity-20 hidden sm:block" />

          <div className="space-y-8 sm:space-y-0">
            {events.map((ev, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  } ${visible ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.1}s` }}>

                  {/* Content card */}
                  <div className={`w-full sm:w-[calc(50%-2rem)] ${isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                    <div className={`group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-red-100 transition-all duration-300 p-5 ${
                      isLeft ? "sm:ml-auto" : ""
                    }`}>
                      <div className={`flex items-center gap-2 mb-2 ${isLeft ? "sm:flex-row-reverse" : ""}`}>
                        <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full text-white ${ev.color}`}>
                          {ev.year}
                        </span>
                        <span className="text-xs text-gray-400">{ev.month}</span>
                      </div>
                      <h3 className="font-extrabold text-gray-900 mb-1.5">{ev.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{ev.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className={`hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white shadow-lg items-center justify-center text-lg z-10 ${ev.color}`}>
                    {ev.icon}
                  </div>

                  {/* Mobile icon */}
                  <div className={`sm:hidden w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${ev.color}`}>
                    {ev.icon}
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
