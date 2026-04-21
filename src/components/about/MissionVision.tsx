const cards = [
  {
    icon: "🎯",
    title: "আমাদের মিশন",
    color: "from-[#CC0000] to-[#8B0000]",
    border: "border-red-100",
    bg: "bg-red-50",
    text: "বাংলাদেশের প্রতিটি কোণে স্বেচ্ছাসেবী রক্তদাতাদের একটি শক্তিশালী নেটওয়ার্ক গড়ে তোলা এবং রক্তের প্রয়োজনে যেকোনো মানুষকে দ্রুত ও বিনামূল্যে সহায়তা প্রদান করা।",
    points: [
      "২৪/৭ বিনামূল্যে সেবা",
      "সারা দেশে ডোনার নেটওয়ার্ক",
      "দ্রুততম সময়ে রক্ত সংগ্রহ",
    ],
  },
  {
    icon: "🔭",
    title: "আমাদের ভিশন",
    color: "from-[#8B0000] to-[#5a0000]",
    border: "border-rose-100",
    bg: "bg-rose-50",
    text: "এমন একটি বাংলাদেশ গড়া যেখানে রক্তের অভাবে কোনো মানুষের মৃত্যু হবে না। স্বেচ্ছাসেবী রক্তদান হবে প্রতিটি সুস্থ মানুষের সামাজিক দায়িত্ব।",
    points: [
      "শতভাগ স্বেচ্ছাসেবী রক্তদান",
      "রক্তশূন্যতামুক্ত বাংলাদেশ",
      "সচেতন ও সক্রিয় সমাজ",
    ],
  },
  {
    icon: "💎",
    title: "আমাদের মূল্যবোধ",
    color: "from-[#CC0000] to-[#FF4444]",
    border: "border-orange-100",
    bg: "bg-orange-50",
    text: "মানবতা, সততা ও স্বচ্ছতার উপর ভিত্তি করে আমরা কাজ করি। প্রতিটি ডোনার ও রক্তপ্রার্থীর প্রতি আমাদের দায়িত্ব ও সম্মান অটুট।",
    points: [
      "মানবতা সর্বোচ্চ",
      "সম্পূর্ণ স্বচ্ছতা",
      "ডোনারের গোপনীয়তা রক্ষা",
    ],
  },
];

export default function MissionVision() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative drop bg */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='75' viewBox='0 0 40 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z' fill='%23CC0000'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 75px",
          width: "50%", height: "100%",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-red-50 text-[#CC0000] text-sm font-semibold rounded-full border border-red-100 mb-3">
            আমরা কারা
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            মিশন, ভিশন ও <span className="text-[#CC0000]">মূল্যবোধ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={i}
              className={`group relative bg-white rounded-3xl border ${card.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
              {/* Top gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${card.color}`} />

              <div className="p-7">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{card.text}</p>

                {/* Points */}
                <ul className="space-y-2">
                  {card.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover drop decoration */}
              <div className="absolute -bottom-6 -right-6 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                <svg width="80" height="100" viewBox="0 0 40 50" fill="none">
                  <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="#CC0000" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
