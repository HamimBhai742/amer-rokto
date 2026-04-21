"use client";

import { useState } from "react";

const testimonials = [
  {
    name: "রাহেলা বেগম",
    location: "ঢাকা",
    bloodGroup: "O+",
    role: "রক্তগ্রহীতা",
    text: "আমার মায়ের অপারেশনের সময় জরুরি রক্তের প্রয়োজন হয়েছিল। আমার রক্তের মাধ্যমে মাত্র ২ ঘণ্টার মধ্যে ডোনার পেয়েছিলাম। এই প্ল্যাটফর্ম সত্যিই জীবন বাঁচায়।",
    avatar: "রা",
    color: "bg-red-500",
  },
  {
    name: "মোহাম্মদ আরিফ",
    location: "চট্টগ্রাম",
    bloodGroup: "A+",
    role: "নিয়মিত ডোনার",
    text: "গত ৩ বছর ধরে আমি আমার রক্তের মাধ্যমে রক্ত দিয়ে আসছি। এখন পর্যন্ত ৮ বার রক্ত দিয়েছি। প্রতিবার একটা অসাধারণ অনুভূতি হয়।",
    avatar: "আ",
    color: "bg-rose-600",
  },
  {
    name: "সুমাইয়া খানম",
    location: "সিলেট",
    bloodGroup: "B+",
    role: "ডোনার",
    text: "নিবন্ধন করা খুবই সহজ ছিল। যখন কেউ আমার গ্রুপের রক্ত চায়, সাথে সাথে নোটিফিকেশন পাই। এটা সত্যিই একটা দারুণ উদ্যোগ।",
    avatar: "সু",
    color: "bg-red-700",
  },
  {
    name: "তানভীর হোসেন",
    location: "রাজশাহী",
    bloodGroup: "AB-",
    role: "রক্তগ্রহীতা",
    text: "AB- রক্ত পাওয়া খুবই কঠিন। কিন্তু আমার রক্তের মাধ্যমে আমি মাত্র ৩ ঘণ্টায় ডোনার পেয়েছিলাম। অবিশ্বাস্য!",
    avatar: "তা",
    color: "bg-red-800",
  },
  {
    name: "নাজমা আক্তার",
    location: "খুলনা",
    bloodGroup: "O-",
    role: "নিয়মিত ডোনার",
    text: "O- ইউনিভার্সাল ডোনার হিসেবে আমি সবসময় রক্ত দিতে প্রস্তুত। এই প্ল্যাটফর্ম আমাকে সঠিক সময়ে সঠিক মানুষের কাছে পৌঁছে দেয়।",
    avatar: "না",
    color: "bg-crimson-600",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#CC0000] to-transparent opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-red-50 text-[#CC0000] text-sm font-semibold rounded-full border border-red-100 mb-3">
            মানুষের কথা
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            তারা যা <span className="text-[#CC0000]">বলছেন</span>
          </h2>
        </div>

        {/* Featured testimonial */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative bg-gradient-to-br from-[#FFF5F5] to-white border border-red-100 rounded-3xl p-8 sm:p-10 shadow-lg">
            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-6xl text-[#CC0000] opacity-15 font-serif leading-none select-none">
              "
            </div>

            <div className="relative">
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{testimonials[active].text}"
              </p>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${testimonials[active].color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                  {testimonials[active].avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{testimonials[active].name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonials[active].role} · {testimonials[active].location}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white text-sm font-bold rounded-full shadow">
                    {testimonials[active].bloodGroup}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail selector */}
        <div className="flex justify-center gap-3 flex-wrap">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === i
                  ? "bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-[#CC0000]"
              }`}
            >
              <span className={`w-6 h-6 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                {t.avatar}
              </span>
              <span className="hidden sm:inline">{t.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                active === i ? "w-6 h-2 bg-[#CC0000]" : "w-2 h-2 bg-gray-300 hover:bg-red-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
