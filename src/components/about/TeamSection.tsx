const team = [
  {
    name: "রাহেলা আক্তার",
    role: "প্রতিষ্ঠাতা ও সিইও",
    bio: "সফটওয়্যার ইঞ্জিনিয়ার থেকে সামাজিক উদ্যোক্তা। ব্যক্তিগত অভিজ্ঞতা থেকে আমার রক্তের স্বপ্ন দেখেন।",
    initials: "রা",
    donations: "১৫ বার",
    bloodGroup: "AB+",
    gradient: "from-red-500 to-red-700",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "মোহাম্মদ তানভীর",
    role: "প্রধান প্রযুক্তি কর্মকর্তা",
    bio: "১০ বছরের প্রযুক্তি অভিজ্ঞতা। আমার রক্তের পুরো প্ল্যাটফর্ম আর্কিটেকচার তার হাতে তৈরি।",
    initials: "তা",
    donations: "৮ বার",
    bloodGroup: "O+",
    gradient: "from-rose-500 to-rose-700",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "ফারহানা ইসলাম",
    role: "পরিচালক, কমিউনিটি",
    bio: "সারা দেশে ডোনার নেটওয়ার্ক গড়ে তোলার পেছনে তার অক্লান্ত পরিশ্রম।",
    initials: "ফা",
    donations: "১২ বার",
    bloodGroup: "A+",
    gradient: "from-red-600 to-red-800",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "ডা. আরিফুল হক",
    role: "চিকিৎসা উপদেষ্টা",
    bio: "ঢাকা মেডিকেল কলেজের হেমাটোলজি বিভাগের সহযোগী অধ্যাপক। চিকিৎসা নির্দেশনার দায়িত্বে।",
    initials: "আ",
    donations: "২০ বার",
    bloodGroup: "B+",
    gradient: "from-red-700 to-red-900",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "সুমাইয়া খানম",
    role: "পরিচালক, মার্কেটিং",
    bio: "সচেতনতা প্রচারণা ও সামাজিক মিডিয়া কৌশলের নেতৃত্ব দেন। রক্তদান আন্দোলনের মুখপাত্র।",
    initials: "সু",
    donations: "৬ বার",
    bloodGroup: "O-",
    gradient: "from-rose-600 to-rose-800",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "জাহিদ হোসেন",
    role: "পরিচালক, অপারেশন",
    bio: "দৈনন্দিন কার্যক্রম পরিচালনা ও ব্লাড ব্যাংক অংশীদারিত্বের দায়িত্বে নিয়োজিত।",
    initials: "জা",
    donations: "১০ বার",
    bloodGroup: "B-",
    gradient: "from-red-500 to-red-800",
    social: { linkedin: "#", twitter: "#" },
  },
];

export default function TeamSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF5F5] to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-red-50 text-[#CC0000] text-sm font-semibold rounded-full border border-red-100 mb-3">
            আমাদের দল
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            যারা <span className="text-[#CC0000]">পরিবর্তন আনছেন</span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
            আমাদের নিবেদিতপ্রাণ দল প্রতিদিন কাজ করে যাচ্ছে একটি সুন্দর বাংলাদেশের স্বপ্নে
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div key={i}
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Top gradient */}
              <div className={`h-1.5 bg-gradient-to-r ${member.gradient}`} />

              <div className="p-6">
                {/* Avatar + blood group */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-extrabold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      {member.initials}
                    </div>
                    {/* Verified badge */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Blood group badge */}
                  <div className={`px-3 py-1.5 rounded-xl bg-gradient-to-br ${member.gradient} text-white text-xs font-extrabold shadow-sm`}>
                    {member.bloodGroup}
                  </div>
                </div>

                {/* Info */}
                <h3 className="font-extrabold text-gray-900 text-base mb-0.5">{member.name}</h3>
                <p className="text-xs font-semibold text-[#CC0000] mb-3">{member.role}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{member.bio}</p>

                {/* Donation count */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span>🩸</span>
                    <span>রক্তদান: <span className="font-bold text-[#CC0000]">{member.donations}</span></span>
                  </div>

                  {/* Social links */}
                  <div className="flex gap-2">
                    <a href={member.social.linkedin}
                      className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
                      aria-label="LinkedIn">
                      <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href={member.social.twitter}
                      className="w-7 h-7 rounded-lg bg-sky-50 hover:bg-sky-100 flex items-center justify-center transition-colors"
                      aria-label="Twitter">
                      <svg className="w-3.5 h-3.5 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join team CTA */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-red-50 border border-red-100 rounded-2xl px-6 py-4">
            <p className="text-sm text-gray-600">
              আমাদের দলে যোগ দিতে চান? আমরা সবসময় নিবেদিতপ্রাণ স্বেচ্ছাসেবী খুঁজছি।
            </p>
            <a href="/contact"
              className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 transition-all">
              যোগাযোগ করুন →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
