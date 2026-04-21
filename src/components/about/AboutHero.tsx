export default function AboutHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-[#8B0000] via-[#CC0000] to-[#FF2222] overflow-hidden">

      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-[#8B0000]/40 blur-3xl animate-pulse delay-700" />
        <div className="absolute -bottom-24 left-1/4 w-72 h-72 rounded-full bg-white/5 blur-3xl animate-pulse delay-300" />
      </div>

      {/* ECG line */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1200 80" className="w-full h-full" preserveAspectRatio="none">
          <polyline
            points="0,40 120,40 160,40 185,8 210,72 235,40 300,40 340,40 365,10 390,70 415,40 480,40 520,40 545,8 570,72 595,40 660,40 700,40 725,10 750,70 775,40 840,40 880,40 905,8 930,72 955,40 1020,40 1060,40 1085,10 1110,70 1135,40 1200,40"
            fill="none" stroke="white" strokeWidth="2"
          />
        </svg>
      </div>

      {/* Floating blood drops */}
      {[
        { top: "8%",  left: "4%",  size: 32, delay: "0s"   },
        { top: "70%", left: "93%", size: 20, delay: "1.4s" },
        { top: "20%", left: "90%", size: 14, delay: "0.7s" },
        { top: "80%", left: "7%",  size: 16, delay: "2s"   },
        { top: "45%", left: "96%", size: 10, delay: "0.4s" },
      ].map((d, i) => (
        <div key={i} className="absolute opacity-15 pointer-events-none"
          style={{ top: d.top, left: d.left, animation: `floatDrop 4s ease-in-out ${d.delay} infinite` }}>
          <svg width={d.size} height={d.size * 1.25} viewBox="0 0 40 50" fill="none">
            <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="white" />
          </svg>
        </div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div className="text-white space-y-6 animate-slide-left">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              আমাদের সম্পর্কে
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              রক্তের বন্ধনে
              <br />
              <span className="text-yellow-300">একটি জাতি</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-lg">
              আমার রক্ত একটি অলাভজনক উদ্যোগ যা বাংলাদেশের স্বেচ্ছাসেবী রক্তদাতাদের
              সাথে রক্তপ্রার্থীদের সংযুক্ত করে। আমাদের লক্ষ্য — প্রতিটি মানুষের
              কাছে সময়মতো রক্ত পৌঁছে দেওয়া।
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { value: "২০১৮", label: "প্রতিষ্ঠা সাল" },
                { value: "২৪৩৯+", label: "সক্রিয় ডোনার" },
                { value: "৬৪", label: "জেলায় সেবা" },
              ].map((s) => (
                <div key={s.label} className="bg-white/15 border border-white/20 rounded-2xl px-5 py-3 text-center">
                  <div className="text-2xl font-extrabold text-yellow-300">{s.value}</div>
                  <div className="text-xs text-white/70 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Animated blood drop with mission text */}
          <div className="hidden lg:flex items-center justify-center animate-slide-right">
            <div className="relative w-72 h-72">
              {/* Ripple rings */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="absolute inset-0 rounded-full border-2 border-white/15"
                  style={{ animation: `ripple 3s ease-out ${i * 0.9}s infinite` }} />
              ))}

              {/* Central drop */}
              <div className="absolute inset-0 flex items-center justify-center animate-blood-pulse">
                <svg viewBox="0 0 160 200" className="w-52 h-52 drop-shadow-2xl">
                  <defs>
                    <linearGradient id="aboutDropGrad" x1="80" y1="0" x2="80" y2="200" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF6666" />
                      <stop offset="50%" stopColor="#FF2222" />
                      <stop offset="100%" stopColor="#660000" />
                    </linearGradient>
                  </defs>
                  <path d="M80 8 C80 8 16 80 16 128 C16 166 44.8 192 80 192 C115.2 192 144 166 144 128 C144 80 80 8 80 8Z"
                    fill="url(#aboutDropGrad)" filter="drop-shadow(0 8px 24px rgba(139,0,0,0.5))" />
                  <ellipse cx="58" cy="100" rx="16" ry="28" fill="rgba(255,255,255,0.18)" />
                  <text x="80" y="118" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">আমার</text>
                  <text x="80" y="138" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">রক্ত</text>
                  <text x="80" y="158" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="Arial">since 2018</text>
                </svg>
              </div>

              {/* Orbiting values */}
              {[
                { label: "মানবতা", angle: 0   },
                { label: "সেবা",   angle: 120  },
                { label: "আশা",    angle: 240  },
              ].map(({ label, angle }) => {
                const rad = (angle * Math.PI) / 180;
                const r = 130;
                const x = 50 + r * Math.cos(rad) * 0.5;
                const y = 50 + r * Math.sin(rad) * 0.5;
                return (
                  <div key={label}
                    className="absolute px-3 py-1.5 bg-white/20 border border-white/30 rounded-full text-white text-xs font-bold backdrop-blur-sm shadow"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}>
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
