const stepTips: Record<number, { title: string; items: string[] }> = {
  1: {
    title: "যোগ্যতার শর্ত",
    items: [
      "বয়স ১৮ থেকে ৬০ বছর",
      "ওজন ন্যূনতম ৫০ কেজি",
      "শেষ দানের ৯০ দিন পর",
      "হিমোগ্লোবিন ১২.৫ g/dL+",
      "কোনো সংক্রামক রোগ নেই",
    ],
  },
  2: {
    title: "তথ্য সুরক্ষা",
    items: [
      "আপনার তথ্য সম্পূর্ণ নিরাপদ",
      "শুধু রক্তদানের জন্য ব্যবহার",
      "তৃতীয় পক্ষকে শেয়ার নয়",
      "যেকোনো সময় তথ্য মুছতে পারবেন",
    ],
  },
  3: {
    title: "রক্তদানের উপকারিতা",
    items: [
      "হৃদরোগের ঝুঁকি কমায়",
      "বিনামূল্যে স্বাস্থ্য পরীক্ষা",
      "নতুন রক্তকণিকা তৈরি হয়",
      "মানসিক তৃপ্তি ও আত্মতৃপ্তি",
      "প্রতি দানে ~৬৫০ ক্যালোরি বার্ন",
    ],
  },
  4: {
    title: "নিবন্ধনের পর",
    items: [
      "SMS নিশ্চিতকরণ পাবেন",
      "১–২ দিনে তথ্য যাচাই",
      "ডোনার তালিকায় যুক্ত হবেন",
      "রক্তের প্রয়োজনে কল পাবেন",
    ],
  },
};

const stats = [
  { value: "২৪৩৯+", label: "সক্রিয় ডোনার" },
  { value: "৬৪", label: "জেলায় সেবা" },
  { value: "৯০", label: "দিন পর পর দান" },
];

export default function WhyDonateAside({ currentStep }: { currentStep: number }) {
  const tip = stepTips[currentStep];

  return (
    <div className="space-y-4">
      {/* Tips card */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#CC0000] to-[#8B0000] px-5 py-3">
          <p className="text-white font-bold text-sm flex items-center gap-2">
            <span>💡</span> {tip.title}
          </p>
        </div>
        <ul className="p-4 space-y-2.5">
          {tip.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
              <svg className="w-4 h-4 text-[#CC0000] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-br from-[#8B0000] to-[#CC0000] rounded-2xl p-5 text-white">
        <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-3">আমাদের নেটওয়ার্ক</p>
        <div className="space-y-3">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <span className="text-sm text-white/80">{s.label}</span>
              <span className="text-lg font-extrabold text-yellow-300">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency CTA */}
      <a
        href="/emergency"
        className="flex items-center gap-3 bg-white border-2 border-dashed border-red-200 rounded-2xl p-4 hover:bg-red-50 hover:border-red-300 transition-all duration-200 group"
      >
        <span className="text-2xl animate-heartbeat">🚨</span>
        <div>
          <p className="text-sm font-bold text-gray-800 group-hover:text-[#CC0000] transition-colors">জরুরি রক্ত দরকার?</p>
          <p className="text-xs text-gray-400">এখনই অনুরোধ পাঠান</p>
        </div>
        <svg className="w-4 h-4 text-gray-400 ml-auto group-hover:text-[#CC0000] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>

      {/* Quote */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
        <p className="text-sm text-gray-600 italic leading-relaxed">
          "একটি রক্তদান তিনটি জীবন বাঁচাতে পারে। আপনার সিদ্ধান্তই পার্থক্য তৈরি করে।"
        </p>
        <p className="text-xs text-[#CC0000] font-semibold mt-2">— আমার রক্ত</p>
      </div>
    </div>
  );
}
