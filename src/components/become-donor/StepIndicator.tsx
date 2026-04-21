type Step = { id: number; label: string; icon: string };

type Props = {
  currentStep: number;
  steps: Step[];
};

export default function StepIndicator({ currentStep, steps }: Props) {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 hidden sm:block" />
      <div
        className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-[#CC0000] to-[#8B0000] hidden sm:block transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      <div className="relative flex justify-between sm:justify-around">
        {steps.map((s) => {
          const done = s.id < currentStep;
          const active = s.id === currentStep;
          return (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div
                className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 z-10 ${
                  done
                    ? "bg-gradient-to-br from-[#CC0000] to-[#8B0000] border-[#CC0000] text-white shadow-md shadow-red-200"
                    : active
                    ? "bg-white border-[#CC0000] text-[#CC0000] shadow-lg shadow-red-100 scale-110"
                    : "bg-white border-gray-200 text-gray-400"
                }`}
              >
                {done ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{s.icon}</span>
                )}
                {active && (
                  <span className="absolute inset-0 rounded-full border-2 border-[#CC0000] animate-ping opacity-30" />
                )}
              </div>
              <span className={`text-xs font-semibold hidden sm:block transition-colors duration-300 ${
                active ? "text-[#CC0000]" : done ? "text-gray-600" : "text-gray-400"
              }`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile step label */}
      <div className="sm:hidden text-center mt-3">
        <span className="text-sm font-bold text-[#CC0000]">
          ধাপ {currentStep}/{steps.length}: {steps[currentStep - 1].label}
        </span>
      </div>
    </div>
  );
}
