const steps = [
  {
    step: "০১",
    title: "নিবন্ধন করুন",
    desc: "আপনার রক্তের গ্রুপ, জেলা ও যোগাযোগের তথ্য দিয়ে বিনামূল্যে নিবন্ধন করুন।",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    step: "০২",
    title: "অনুরোধ করুন",
    desc: "রক্তের প্রয়োজন হলে গ্রুপ ও জেলা উল্লেখ করে অনুরোধ পাঠান।",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    step: "০৩",
    title: "ডোনার খুঁজুন",
    desc: "সিস্টেম স্বয়ংক্রিয়ভাবে কাছের উপযুক্ত ডোনারদের সাথে যোগাযোগ করে।",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: "০৪",
    title: "জীবন বাঁচান",
    desc: "ডোনার সাড়া দিলে সরাসরি যোগাযোগ করুন এবং রক্তদান সম্পন্ন করুন।",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF5F5] to-white relative overflow-hidden">
      {/* Decorative drops */}
      <div className="absolute top-8 right-8 opacity-10 pointer-events-none">
        <svg width="120" height="150" viewBox="0 0 40 50" fill="none">
          <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="#CC0000" />
        </svg>
      </div>
      <div className="absolute bottom-8 left-8 opacity-10 pointer-events-none">
        <svg width="80" height="100" viewBox="0 0 40 50" fill="none">
          <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="#CC0000" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-red-50 text-[#CC0000] text-sm font-semibold rounded-full border border-red-100 mb-3">
            কীভাবে কাজ করে
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            মাত্র <span className="text-[#CC0000]">৪টি ধাপে</span> রক্ত পান
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            আমার রক্ত ব্যবহার করা অত্যন্ত সহজ — যেকোনো সময়, যেকোনো জায়গা থেকে
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#CC0000] via-[#FF4444] to-[#CC0000] opacity-30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((s, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step number badge */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#CC0000] to-[#8B0000] flex items-center justify-center text-white shadow-lg group-hover:shadow-red-300 group-hover:scale-110 transition-all duration-300">
                    {s.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#8B0000] border-2 border-white flex items-center justify-center text-white text-xs font-extrabold shadow">
                    {i + 1}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">{s.desc}</p>

                {/* Arrow between steps (mobile) */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden mt-4 text-[#CC0000] opacity-40">
                    <svg className="w-6 h-6 mx-auto rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
