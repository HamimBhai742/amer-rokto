import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-[#8B0000] via-[#CC0000] to-[#FF2222]">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#8B0000]/30 blur-3xl" />
      </div>

      {/* Floating drops */}
      {[
        { top: "15%", left: "5%", size: 20 },
        { top: "70%", left: "90%", size: 16 },
        { top: "40%", left: "95%", size: 12 },
        { top: "80%", left: "8%", size: 14 },
      ].map((d, i) => (
        <div
          key={i}
          className="absolute opacity-15 pointer-events-none"
          style={{
            top: d.top,
            left: d.left,
            animation: `floatDrop 4s ease-in-out ${i * 0.7}s infinite`,
          }}
        >
          <svg width={d.size} height={d.size * 1.25} viewBox="0 0 40 50" fill="none">
            <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="white" />
          </svg>
        </div>
      ))}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Heartbeat icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center text-3xl animate-heartbeat">
            🩸
          </div>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
          আজই একটি জীবন
          <br />
          <span className="text-yellow-300">বাঁচানোর সুযোগ নিন</span>
        </h2>

        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          আপনার একটি সিদ্ধান্ত কারো জীবন বদলে দিতে পারে। আজই আমার রক্তে যোগ দিন
          এবং স্বেচ্ছাসেবী রক্তদাতাদের বিশাল পরিবারের অংশ হন।
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/become-donor"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#CC0000] font-extrabold rounded-2xl hover:bg-yellow-50 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-base"
          >
            🩸 ডোনার হিসেবে নিবন্ধন করুন
          </Link>
          <Link
            href="/request-blood"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 border-2 border-white/40 text-white font-bold rounded-2xl hover:bg-white/25 transition-all duration-200 text-base"
          >
            রক্তের অনুরোধ করুন
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-white/60 text-sm">
          {["✅ সম্পূর্ণ বিনামূল্যে", "🔒 তথ্য সুরক্ষিত", "⚡ ২৪/৭ সেবা", "🇧🇩 সারা বাংলাদেশে"].map((badge) => (
            <span key={badge} className="flex items-center gap-1">{badge}</span>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
          <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,10 1440,20 L1440,40 L0,40 Z" fill="white" opacity="0.1" />
        </svg>
      </div>
    </section>
  );
}
