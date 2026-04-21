const benefits = [
  {
    icon: "❤️",
    title: "হৃদয় সুস্থ রাখে",
    desc: "নিয়মিত রক্তদান হৃদরোগের ঝুঁকি কমায় এবং রক্তের আয়রন মাত্রা নিয়ন্ত্রণে রাখে।",
  },
  {
    icon: "🔬",
    title: "বিনামূল্যে স্বাস্থ্য পরীক্ষা",
    desc: "প্রতিবার রক্তদানের আগে রক্তচাপ, হিমোগ্লোবিন ও অন্যান্য পরীক্ষা বিনামূল্যে হয়।",
  },
  {
    icon: "🧬",
    title: "নতুন রক্তকণিকা তৈরি",
    desc: "রক্তদানের পর শরীর নতুন রক্তকণিকা তৈরি করে, যা শরীরকে সতেজ রাখে।",
  },
  {
    icon: "🌟",
    title: "মানসিক তৃপ্তি",
    desc: "একটি জীবন বাঁচানোর অনুভূতি অতুলনীয়। রক্তদান মানসিক শান্তি ও আত্মতৃপ্তি দেয়।",
  },
  {
    icon: "⚖️",
    title: "ক্যালোরি বার্ন",
    desc: "প্রতিবার রক্তদানে প্রায় ৬৫০ ক্যালোরি পোড়ে, যা ওজন নিয়ন্ত্রণে সহায়ক।",
  },
  {
    icon: "🤝",
    title: "সামাজিক দায়িত্ব",
    desc: "রক্তদান একটি মহৎ সামাজিক কাজ। আপনার একটি ব্যাগ রক্ত তিনটি জীবন বাঁচাতে পারে।",
  },
];

const facts = [
  { number: "৩", text: "জীবন বাঁচে প্রতিটি রক্তদানে" },
  { number: "৯০", text: "দিন পর পর রক্ত দেওয়া যায়" },
  { number: "৪৫০", text: "মিলিলিটার রক্ত নেওয়া হয়" },
  { number: "১৮-৬০", text: "বছর বয়সে রক্ত দেওয়া যায়" },
];

export default function WhyDonate() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF5F5] to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-red-50 text-[#CC0000] text-sm font-semibold rounded-full border border-red-100 mb-3">
            কেন রক্ত দেবেন?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            রক্তদানের <span className="text-[#CC0000]">উপকারিতা</span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            রক্তদান শুধু অন্যের জীবন বাঁচায় না, আপনার নিজের স্বাস্থ্যও ভালো রাখে
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="group flex gap-4 p-5 rounded-2xl bg-white border border-red-50 shadow-sm hover:shadow-md hover:border-red-200 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl group-hover:bg-red-100 transition-colors duration-200">
                {b.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Facts banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#8B0000] via-[#CC0000] to-[#8B0000] p-8 sm:p-10">
          {/* ECG line decoration */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 1200 100" className="w-full h-full" preserveAspectRatio="none">
              <polyline
                points="0,50 150,50 200,50 230,10 260,90 290,50 350,50 400,50 430,15 460,85 490,50 550,50 600,50 630,10 660,90 690,50 750,50 800,50 830,15 860,85 890,50 950,50 1000,50 1030,10 1060,90 1090,50 1200,50"
                fill="none" stroke="white" strokeWidth="2"
              />
            </svg>
          </div>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white">
            {facts.map((f, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-yellow-300">{f.number}</div>
                <div className="text-sm text-white/80 font-medium">{f.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
