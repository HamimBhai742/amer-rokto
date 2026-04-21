"use client";

/* ─── Shared reusable form primitives ─── */

export function StepHeader({
  step, title, subtitle, icon,
}: { step: number; title: string; subtitle: string; icon: string }) {
  return (
    <div className="bg-gradient-to-r from-[#FFF5F5] to-white border-b border-red-50 px-6 sm:px-8 py-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CC0000] to-[#8B0000] flex items-center justify-center text-white text-lg shadow-md flex-shrink-0">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#CC0000] bg-red-50 px-2 py-0.5 rounded-full">
              ধাপ {step}
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-gray-900 mt-0.5">{title}</h2>
          <p className="text-xs text-gray-500 mt-0.5 max-w-lg">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export function InputField({
  label, placeholder, value, onChange, error, hint, icon, type = "text",
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; error: string; hint?: string;
  icon?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1.5">
        {icon && <span className="mr-1">{icon}</span>}{label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-400 focus:ring-red-200 focus:border-red-400"
            : "border-gray-200 focus:ring-[#CC0000]/20 focus:border-[#CC0000]"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span>⚠</span>{error}</p>}
      {hint && !error && <p className="text-[10px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export function SelectField({
  label, value, onChange, options, placeholder, error, icon,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder: string; error: string; icon?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1.5">
        {icon && <span className="mr-1">{icon}</span>}{label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none bg-gray-50 border rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 transition-colors cursor-pointer pr-8 ${
            error
              ? "border-red-400 focus:ring-red-200"
              : "border-gray-200 focus:ring-[#CC0000]/20 focus:border-[#CC0000]"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  );
}

export function YesNoField({
  label, value, onChange, yesGood, showError,
}: {
  label: string; value: boolean | null;
  onChange: (v: boolean) => void; yesGood: boolean; showError: boolean;
}) {
  const yesActive = value === true;
  const noActive = value === false;
  const yesIsGood = yesGood;
  const noIsGood = !yesGood;

  return (
    <div className={`rounded-xl border-2 p-3 transition-all duration-200 ${
      showError ? "border-red-300 bg-red-50" :
      value !== null ? "border-gray-200 bg-gray-50" : "border-gray-100"
    }`}>
      <p className="text-sm text-gray-700 mb-2.5 leading-relaxed">{label}</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all duration-200 flex items-center justify-center gap-1.5 ${
            yesActive
              ? yesIsGood
                ? "border-green-500 bg-green-500 text-white"
                : "border-red-500 bg-red-500 text-white"
              : "border-gray-200 text-gray-500 hover:border-gray-300"
          }`}
        >
          {yesActive && (yesIsGood ? "✓" : "✗")} হ্যাঁ
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all duration-200 flex items-center justify-center gap-1.5 ${
            noActive
              ? noIsGood
                ? "border-green-500 bg-green-500 text-white"
                : "border-red-500 bg-red-500 text-white"
              : "border-gray-200 text-gray-500 hover:border-gray-300"
          }`}
        >
          {noActive && (noIsGood ? "✓" : "✗")} না
        </button>
      </div>
      {showError && <p className="text-xs text-red-500 mt-1.5">উত্তর দিন</p>}
    </div>
  );
}

export function NavButtons({
  onNext, onBack, nextLabel = "পরবর্তী →",
}: { onNext: () => void; onBack?: () => void; nextLabel?: string }) {
  return (
    <div className="flex gap-3 pt-2">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:border-red-200 hover:text-[#CC0000] transition-all duration-200 text-sm"
        >
          ← পেছনে
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#CC0000] to-[#8B0000] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 transition-all duration-200 text-sm"
      >
        {nextLabel}
      </button>
    </div>
  );
}

export function IneligibleBanner() {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex gap-3">
      <span className="text-red-500 text-xl flex-shrink-0">🚫</span>
      <div>
        <p className="text-sm font-bold text-red-700 mb-1">আপনি এই মুহূর্তে রক্ত দিতে পারবেন না</p>
        <p className="text-xs text-red-600 leading-relaxed">
          আপনার দেওয়া তথ্য অনুযায়ী আপনি এখন রক্তদানের যোগ্য নন। সুস্থ হলে বা নির্দিষ্ট সময় পর আবার চেষ্টা করুন।
          তবুও আপনি ভবিষ্যতের জন্য নিবন্ধন করতে পারেন।
        </p>
      </div>
    </div>
  );
}
