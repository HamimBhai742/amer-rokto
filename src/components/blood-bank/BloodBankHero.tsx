export default function BloodBankHero() {
  return (
    <div className="relative bg-gradient-to-br from-[#8B0000] via-[#CC0000] to-[#FF2222] overflow-hidden">
      {/* ECG line */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1200 80" className="w-full h-full" preserveAspectRatio="none">
          <polyline
            points="0,40 120,40 160,40 185,8 210,72 235,40 300,40 340,40 365,10 390,70 415,40 480,40 520,40 545,8 570,72 595,40 660,40 700,40 725,10 750,70 775,40 840,40 880,40 905,8 930,72 955,40 1020,40 1060,40 1085,10 1110,70 1135,40 1200,40"
            fill="none" stroke="white" strokeWidth="2"
          />
        </svg>
      </div>

      {/* Floating drops */}
      {[
        { top: "10%", left: "5%",  size: 24, delay: "0s"   },
        { top: "65%", left: "92%", size: 16, delay: "1.3s" },
        { top: "25%", left: "88%", size: 12, delay: "0.6s" },
      ].map((d, i) => (
        <div key={i} className="absolute opacity-15 pointer-events-none"
          style={{ top: d.top, left: d.left, animation: `floatDrop 4s ease-in-out ${d.delay} infinite` }}>
          <svg width={d.size} height={d.size * 1.25} viewBox="0 0 40 50" fill="none">
            <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="white" />
          </svg>
        </div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            বাংলাদেশের সকল ব্লাড ব্যাংক
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
            <span className="text-yellow-300">ব্লাড ব্যাংক</span> খুঁজুন
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto">
            সারা দেশের ব্লাড ব্যাংকের তালিকা, রক্তের মজুদ ও যোগাযোগ তথ্য এক জায়গায়
          </p>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
          <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,10 1440,20 L1440,40 L0,40 Z" fill="#f9fafb" />
        </svg>
      </div>
    </div>
  );
}
