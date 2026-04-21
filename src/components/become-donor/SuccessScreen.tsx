"use client";

import Link from "next/link";
import type { FormData } from "./BecomeDonorClient";

const groupColors: Record<string, string> = {
  "A+": "from-red-500 to-red-700", "A-": "from-red-600 to-red-800",
  "B+": "from-rose-500 to-rose-700", "B-": "from-rose-600 to-rose-800",
  "AB+": "from-red-700 to-red-900", "AB-": "from-red-800 to-red-950",
  "O+": "from-red-400 to-red-600", "O-": "from-red-500 to-red-700",
};

export default function SuccessScreen({ form }: { form: FormData }) {
  const gradColor = groupColors[form.bloodGroup] ?? "from-red-500 to-red-700";
  const initials = form.fullName.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-white to-[#FFF5F5] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Animated success drop */}
        <div className="relative flex justify-center mb-8">
          {/* Ripple rings */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-[#CC0000]/20"
              style={{
                width: `${i * 80}px`, height: `${i * 80}px`,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                animation: `ripple 3s ease-out ${i * 0.7}s infinite`,
              }}
            />
          ))}
          <div className="relative w-24 h-28 animate-blood-pulse">
            <svg viewBox="0 0 40 50" fill="none" className="w-full h-full drop-shadow-xl">
              <defs>
                <linearGradient id="successGrad" x1="20" y1="0" x2="20" y2="50" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FF4444" />
                  <stop offset="100%" stopColor="#8B0000" />
                </linearGradient>
              </defs>
              <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="url(#successGrad)" />
              <path d="M14 26 L18 30 L26 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            অভিনন্দন! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-bold text-[#CC0000]">{form.fullName}</span>, আপনার নিবন্ধন সফল হয়েছে!
          </p>
          <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
            আপনি এখন আমার রক্তের স্বেচ্ছাসেবী ডোনার পরিবারের অংশ। আপনার তথ্য যাচাই করা হবে এবং শীঘ্রই আপনাকে সক্রিয় করা হবে।
          </p>
        </div>

        {/* Donor card preview */}
        <div className="relative bg-gradient-to-br from-[#8B0000] via-[#CC0000] to-[#FF2222] rounded-3xl p-6 text-white mb-8 overflow-hidden shadow-2xl shadow-red-200">
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="120" height="150" viewBox="0 0 40 50" fill="none">
              <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="white" />
            </svg>
          </div>
          {/* ECG line */}
          <div className="absolute bottom-4 left-0 right-0 opacity-15">
            <svg viewBox="0 0 400 30" className="w-full" preserveAspectRatio="none">
              <polyline points="0,15 60,15 80,15 95,3 110,27 125,15 160,15 180,15 195,5 210,25 225,15 260,15 280,15 295,3 310,27 325,15 400,15"
                fill="none" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="relative flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-white font-extrabold text-xl">
              {initials}
            </div>
            <div className="flex-1 text-left">
              <p className="font-extrabold text-lg">{form.fullName}</p>
              <p className="text-white/70 text-sm">{form.district}{form.upazila ? ` · ${form.upazila}` : ""}</p>
            </div>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradColor} border-2 border-white/30 flex items-center justify-center text-white font-extrabold text-xl shadow-lg`}>
              {form.bloodGroup}
            </div>
          </div>

          <div className="relative grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/10 rounded-xl p-2">
              <p className="text-lg font-extrabold">{form.totalDonations}</p>
              <p className="text-[10px] text-white/70">মোট দান</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <p className="text-lg font-extrabold">{form.willingToEmergency ? "✓" : "—"}</p>
              <p className="text-[10px] text-white/70">জরুরি দান</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <p className="text-lg font-extrabold">⏳</p>
              <p className="text-[10px] text-white/70">যাচাই বাকি</p>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-white rounded-2xl border border-red-100 p-5 mb-6 text-left shadow-sm">
          <p className="text-sm font-bold text-gray-700 mb-3">পরবর্তী পদক্ষেপ</p>
          <div className="space-y-3">
            {[
              { icon: "📱", text: "আপনার মোবাইলে একটি নিশ্চিতকরণ SMS পাঠানো হবে" },
              { icon: "🔍", text: "আমাদের টিম আপনার তথ্য যাচাই করবে (১–২ কার্যদিবস)" },
              { icon: "✅", text: "যাচাই সম্পন্ন হলে আপনি ডোনার তালিকায় যুক্ত হবেন" },
              { icon: "🩸", text: "রক্তের প্রয়োজনে আপনাকে SMS/কল করা হবে" },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center text-sm flex-shrink-0">
                  {s.icon}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pt-1">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:border-red-200 hover:text-[#CC0000] transition-all duration-200 text-sm"
          >
            🏠 হোমে যান
          </Link>
          <Link
            href="/find-blood"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 transition-all duration-200 text-sm"
          >
            🩸 রক্ত খুঁজুন
          </Link>
        </div>
      </div>
    </div>
  );
}
