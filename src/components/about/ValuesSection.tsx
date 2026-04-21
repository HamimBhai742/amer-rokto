const values = [
  {
    icon: "❤️",
    title: "মানবতা",
    desc: "প্রতিটি মানুষের জীবন মূল্যবান। জাতি, ধর্ম, বর্ণ নির্বিশেষে আমরা সবার পাশে থাকি।",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    icon: "🤝",
    title: "সংহতি",
    desc: "একে অপরের পাশে দাঁড়ানোই আমাদের শক্তি। ডোনার ও গ্রহীতার মধ্যে মানবিক বন্ধন।",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: "🔒",
    title: "বিশ্বাসযোগ্যতা",
    desc: "আপনার তথ্য সম্পূর্ণ সুরক্ষিত। আমরা কখনো তৃতীয় পক্ষের সাথে তথ্য শেয়ার করি না।",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: "⚡",
    title: "দ্রুততা",
    desc: "জরুরি মুহূর্তে প্রতিটি সেকেন্ড গুরুত্বপূর্ণ। আমরা সর্বদা দ্রুততম সেবা নিশ্চিত করি।",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
  },
  {
    icon: "🌱",
    title: "টেকসই উন্নয়ন",
    desc: "দীর্ঘমেয়াদী পরিবর্তনের জন্য কাজ করি। স্বেচ্ছাসেবী রক্তদানকে সংস্কৃতিতে পরিণত করা।",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: "🎓",
    title: "সচেতনতা",
    desc: "রক্তদান সম্পর্কে সঠিক তথ্য ছড়িয়ে দেওয়া এবং ভুল ধারণা দূর করা আমাদের লক্ষ্য।",
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-red-50 text-[#CC0000] text-sm font-semibold rounded-full border border-red-100 mb-3">
            আমাদের মূল্যবোধ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            যে নীতিতে আমরা <span className="text-[#CC0000]">বিশ্বাস করি</span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
            এই মূল্যবোধগুলো আমাদের প্রতিটি সিদ্ধান্ত ও কাজকে পরিচালিত করে
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <div key={i}
              className={`group flex gap-4 p-5 rounded-2xl bg-white border ${v.border} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}>
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${v.bg} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                {v.icon}
              </div>
              <div>
                <h3 className={`font-extrabold text-base mb-1.5 ${v.color}`}>{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
