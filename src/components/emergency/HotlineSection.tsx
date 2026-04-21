const hotlines = [
  {
    name: "আমার রক্ত হেল্পলাইন",
    number: "16600",
    available: "২৪/৭",
    type: "primary",
    desc: "রক্তদান সংক্রান্ত যেকোনো সহায়তা",
  },
  {
    name: "জাতীয় জরুরি সেবা",
    number: "999",
    available: "২৪/৭",
    type: "emergency",
    desc: "পুলিশ, ফায়ার, অ্যাম্বুলেন্স",
  },
  {
    name: "স্বাস্থ্য বাতায়ন",
    number: "16767",
    available: "২৪/৭",
    type: "health",
    desc: "স্বাস্থ্য সংক্রান্ত পরামর্শ",
  },
];

const typeStyles: Record<string, string> = {
  primary:   "from-[#CC0000] to-[#8B0000]",
  emergency: "from-orange-600 to-red-700",
  health:    "from-blue-700 to-blue-900",
};

export default function HotlineSection() {
  return (
    <div className="bg-[#111111] border border-red-900/40 rounded-3xl overflow-hidden shadow-xl shadow-red-900/10">
      {/* Header */}
      <div className="px-5 py-4 border-b border-red-900/30">
        <div className="flex items-center gap-2">
          <span className="text-xl animate-heartbeat">📞</span>
          <h3 className="text-white font-bold text-sm">জরুরি হেল্পলাইন</h3>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {hotlines.map((h) => (
          <a
            key={h.number}
            href={`tel:${h.number}`}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-red-800/40 transition-all duration-200 group"
          >
            {/* Number badge */}
            <div className={`flex-shrink-0 w-14 h-12 rounded-xl bg-gradient-to-br ${typeStyles[h.type]} flex items-center justify-center shadow-md`}>
              <span className="text-white font-extrabold text-sm leading-tight text-center">{h.number}</span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold truncate group-hover:text-red-300 transition-colors">{h.name}</p>
              <p className="text-gray-500 text-[10px] mt-0.5 truncate">{h.desc}</p>
            </div>

            <div className="flex-shrink-0 text-right">
              <span className="text-[10px] text-green-400 font-semibold block">{h.available}</span>
              <svg className="w-4 h-4 text-gray-600 group-hover:text-red-400 transition-colors mt-0.5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Quick share */}
      <div className="px-4 pb-4">
        <div className="bg-red-950/40 border border-red-900/30 rounded-2xl p-3">
          <p className="text-xs text-red-300 font-semibold mb-2 flex items-center gap-1.5">
            <span>📢</span> অনুরোধ শেয়ার করুন
          </p>
          <div className="flex gap-2">
            {[
              { label: "Facebook", icon: "f", color: "bg-blue-700 hover:bg-blue-600" },
              { label: "WhatsApp", icon: "W", color: "bg-green-700 hover:bg-green-600" },
              { label: "Copy Link", icon: "🔗", color: "bg-white/10 hover:bg-white/20" },
            ].map((s) => (
              <button key={s.label}
                className={`flex-1 py-2 rounded-xl text-white text-xs font-bold ${s.color} transition-colors`}>
                {s.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
