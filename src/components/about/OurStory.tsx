export default function OurStory() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Visual */}
          <div className="relative order-2 lg:order-1">
            {/* Main card */}
            <div className="relative bg-gradient-to-br from-[#8B0000] via-[#CC0000] to-[#FF2222] rounded-3xl p-8 text-white overflow-hidden shadow-2xl shadow-red-200">
              {/* ECG decoration */}
              <div className="absolute bottom-6 left-0 right-0 opacity-15 pointer-events-none">
                <svg viewBox="0 0 400 30" className="w-full" preserveAspectRatio="none">
                  <polyline points="0,15 60,15 80,15 95,3 110,27 125,15 160,15 180,15 195,5 210,25 225,15 260,15 280,15 295,3 310,27 325,15 400,15"
                    fill="none" stroke="white" strokeWidth="1.5" />
                </svg>
              </div>
              {/* Drop decoration */}
              <div className="absolute -top-6 -right-6 opacity-10">
                <svg width="100" height="125" viewBox="0 0 40 50" fill="none">
                  <path d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z" fill="white" />
                </svg>
              </div>

              <div className="relative">
                <div className="text-5xl mb-4 animate-heartbeat">🩸</div>
                <blockquote className="text-xl sm:text-2xl font-bold leading-relaxed mb-6">
                  "একটি রক্তদান তিনটি জীবন বাঁচাতে পারে। আমরা সেই সেতু।"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center font-bold text-sm">
                    রা
                  </div>
                  <div>
                    <p className="font-bold text-sm">রাহেলা আক্তার</p>
                    <p className="text-white/70 text-xs">প্রতিষ্ঠাতা, আমার রক্ত</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl border border-red-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CC0000] to-[#8B0000] flex items-center justify-center text-white font-extrabold text-sm">
                O+
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">সর্বাধিক চাহিদা</p>
                <p className="text-[10px] text-gray-400">O+ রক্তের গ্রুপ</p>
              </div>
            </div>

            <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl border border-green-100 p-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs font-bold text-gray-900">৩০ মিনিটে সাড়া</p>
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">গড় রেসপন্স টাইম</p>
            </div>
          </div>

          {/* Right: Story text */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <span className="inline-block px-4 py-1 bg-red-50 text-[#CC0000] text-sm font-semibold rounded-full border border-red-100 mb-3">
                আমাদের গল্প
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                একটি ব্যক্তিগত
                <br />
                <span className="text-[#CC0000]">অভিজ্ঞতা থেকে</span>
                <br />
                জাতীয় উদ্যোগ
              </h2>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                ২০১৭ সালে আমাদের প্রতিষ্ঠাতার মা হঠাৎ অসুস্থ হয়ে পড়েন। জরুরি
                অস্ত্রোপচারের জন্য বিরল AB- রক্তের প্রয়োজন হয়। সারারাত ফোন করেও
                রক্ত পাওয়া যাচ্ছিল না। সেই রাতের অসহায়ত্ব থেকেই জন্ম নেয়
                <span className="font-bold text-[#CC0000]"> আমার রক্ত</span>-র স্বপ্ন।
              </p>
              <p>
                ২০১৮ সালে মাত্র ৫০ জন ডোনার নিয়ে শুরু হওয়া এই যাত্রা আজ
                ২৪৩৯ জনেরও বেশি সক্রিয় ডোনারের একটি শক্তিশালী নেটওয়ার্কে
                পরিণত হয়েছে। আমরা বাংলাদেশের ৬৪টি জেলায় বিনামূল্যে সেবা দিচ্ছি।
              </p>
              <p>
                আমাদের প্রযুক্তি-চালিত প্ল্যাটফর্ম রক্তপ্রার্থী ও ডোনারের মধ্যে
                সেতুবন্ধন তৈরি করে। গড়ে ৩০ মিনিটের মধ্যে আমরা উপযুক্ত ডোনার
                খুঁজে দিতে পারি — কারণ প্রতিটি মিনিট মূল্যবান।
              </p>
            </div>

            {/* Key milestones inline */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { year: "২০১৮", text: "৫০ ডোনার নিয়ে যাত্রা শুরু" },
                { year: "২০১৯", text: "১০টি জেলায় সম্প্রসারণ" },
                { year: "২০২১", text: "১০০০+ ডোনার মাইলফলক" },
                { year: "২০২৪", text: "৬৪ জেলায় পূর্ণ কভারেজ" },
              ].map((m) => (
                <div key={m.year} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-xs font-extrabold text-[#CC0000] bg-white px-2 py-0.5 rounded-lg border border-red-100 flex-shrink-0">
                    {m.year}
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
