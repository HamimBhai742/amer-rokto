"use client";

import Link from "next/link";
import { useState } from "react";

const bloodGroups = [
  { group: "A+", compatible: ["A+", "AB+"], canDonate: ["A+", "A-", "O+", "O-"], color: "from-red-600 to-red-800" },
  { group: "A-", compatible: ["A+", "A-", "AB+", "AB-"], canDonate: ["A-", "O-"], color: "from-red-700 to-red-900" },
  { group: "B+", compatible: ["B+", "AB+"], canDonate: ["B+", "B-", "O+", "O-"], color: "from-rose-600 to-rose-800" },
  { group: "B-", compatible: ["B+", "B-", "AB+", "AB-"], canDonate: ["B-", "O-"], color: "from-rose-700 to-rose-900" },
  { group: "AB+", compatible: ["AB+"], canDonate: ["সব গ্রুপ"], color: "from-crimson-600 to-red-900" },
  { group: "AB-", compatible: ["AB+", "AB-"], canDonate: ["AB-", "A-", "B-", "O-"], color: "from-red-800 to-red-950" },
  { group: "O+", compatible: ["A+", "B+", "AB+", "O+"], canDonate: ["O+", "O-"], color: "from-red-500 to-red-700" },
  { group: "O-", compatible: ["সব গ্রুপ"], canDonate: ["O-"], color: "from-red-600 to-red-800" },
];

export default function BloodGroupFinder() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedData = bloodGroups.find((b) => b.group === selected);

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='75' viewBox='0 0 40 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z' fill='%23CC0000'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 75px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-red-50 text-[#CC0000] text-sm font-semibold rounded-full border border-red-100 mb-3">
            রক্তের গ্রুপ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            আপনার <span className="text-[#CC0000]">রক্তের গ্রুপ</span> বেছে নিন
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            গ্রুপ সিলেক্ট করুন এবং সামঞ্জস্যপূর্ণ ডোনার খুঁজুন
          </p>
        </div>

        {/* Blood group grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 mb-8">
          {bloodGroups.map(({ group, color }) => (
            <button
              key={group}
              onClick={() => setSelected(selected === group ? null : group)}
              className={`relative flex flex-col items-center justify-center h-16 sm:h-20 rounded-2xl font-extrabold text-white text-lg sm:text-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${color} ${
                selected === group
                  ? "ring-4 ring-offset-2 ring-[#CC0000] scale-105 shadow-red-300"
                  : "opacity-85 hover:opacity-100"
              }`}
              aria-pressed={selected === group}
            >
              {group}
              {selected === group && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white" />
              )}
            </button>
          ))}
        </div>

        {/* Info panel */}
        {selectedData && (
          <div className="animate-fade-up bg-gradient-to-br from-[#FFF5F5] to-white border border-red-100 rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Big blood group badge */}
              <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedData.color} flex items-center justify-center text-white text-3xl font-extrabold shadow-lg`}>
                {selectedData.group}
              </div>

              <div className="flex-1 grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    🩸 যাদের রক্ত দিতে পারবেন
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedData.canDonate.map((g) => (
                      <span key={g} className="px-3 py-1 bg-red-100 text-[#CC0000] text-sm font-bold rounded-full">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    💉 যাদের কাছ থেকে রক্ত নিতে পারবেন
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedData.compatible.map((g) => (
                      <span key={g} className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href={`/find-blood?group=${selectedData.group}`}
                className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm whitespace-nowrap"
              >
                {selectedData.group} ডোনার খুঁজুন →
              </Link>
            </div>
          </div>
        )}

        {!selected && (
          <p className="text-center text-gray-400 text-sm mt-4">
            ↑ একটি রক্তের গ্রুপে ক্লিক করুন বিস্তারিত দেখতে
          </p>
        )}
      </div>
    </section>
  );
}
