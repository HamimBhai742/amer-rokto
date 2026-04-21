const tips = [
  {
    icon: "⚡",
    title: "অনুরোধ পাঠানোর পর কী করবেন?",
    steps: [
      "অনুরোধ পাঠানোর পর কাছের ডোনারদের SMS যাবে",
      "ডোনার সাড়া দিলে আপনার নম্বরে কল করবেন",
      "ডোনারকে হাসপাতালের সঠিক ঠিকানা দিন",
      "রক্তদানের আগে ডোনারকে হালকা খাবার দিন",
    ],
    color: "border-yellow-700/40 bg-yellow-950/20",
    titleColor: "text-yellow-400",
  },
  {
    icon: "🏥",
    title: "হাসপাতালে কী প্রস্তুত রাখবেন?",
    steps: [
      "রোগীর রক্তের গ্রুপ রিপোর্ট সংগ্রহ করুন",
      "ডাক্তারের প্রেসক্রিপশন প্রস্তুত রাখুন",
      "ব্লাড ব্যাংকের সাথে আগে যোগাযোগ করুন",
      "ক্রস-ম্যাচিং টেস্টের জন্য সময় রাখুন",
    ],
    color: "border-blue-700/40 bg-blue-950/20",
    titleColor: "text-blue-400",
  },
  {
    icon: "🩸",
    title: "রক্তদাতার জন্য পরামর্শ",
    steps: [
      "রক্ত দেওয়ার আগে পর্যাপ্ত পানি পান করুন",
      "হালকা খাবার খেয়ে যান, খালি পেটে নয়",
      "রক্ত দেওয়ার পর ১৫ মিনিট বিশ্রাম নিন",
      "পরের ২৪ ঘণ্টা ভারী কাজ এড়িয়ে চলুন",
    ],
    color: "border-red-700/40 bg-red-950/20",
    titleColor: "text-red-400",
  },
];

export default function EmergencyTips() {
  return (
    <div className="bg-[#111111] border border-red-900/40 rounded-3xl overflow-hidden shadow-xl shadow-red-900/10">
      <div className="px-6 py-4 border-b border-red-900/30">
        <h3 className="text-white font-bold text-sm flex items-center gap-2">
          <span>💡</span> গুরুত্বপূর্ণ নির্দেশনা
        </h3>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tips.map((tip) => (
          <div key={tip.title} className={`rounded-2xl border p-4 ${tip.color}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{tip.icon}</span>
              <h4 className={`text-xs font-bold ${tip.titleColor} leading-tight`}>{tip.title}</h4>
            </div>
            <ol className="space-y-2">
              {tip.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
                  <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${tip.titleColor} bg-white/5`}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Blood bank directory teaser */}
      <div className="mx-5 mb-5 bg-gradient-to-r from-[#8B0000]/30 to-[#CC0000]/20 border border-red-800/30 rounded-2xl p-4 flex items-center gap-4">
        <div className="text-3xl flex-shrink-0">🏦</div>
        <div className="flex-1">
          <p className="text-white text-sm font-bold">ব্লাড ব্যাংক খুঁজুন</p>
          <p className="text-gray-400 text-xs mt-0.5">কাছের ব্লাড ব্যাংকের তালিকা ও যোগাযোগ নম্বর</p>
        </div>
        <a href="/blood-bank"
          className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-900/40 transition-all">
          দেখুন →
        </a>
      </div>
    </div>
  );
}
