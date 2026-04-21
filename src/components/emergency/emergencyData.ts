export type ActiveRequest = {
  id: number;
  bloodGroup: string;
  hospital: string;
  district: string;
  units: number;
  postedAt: string;
  contact: string;
  patientAge: string;
  reason: string;
  urgent: boolean;
  responded: number;
};

export const activeRequests: ActiveRequest[] = [
  { id: 1,  bloodGroup: "O-",  hospital: "ঢাকা মেডিকেল কলেজ হাসপাতাল", district: "ঢাকা",       units: 2, postedAt: "১৫ মিনিট আগে", contact: "017XXXXXXXX", patientAge: "৩৫",  reason: "অস্ত্রোপচার",    urgent: true,  responded: 0 },
  { id: 2,  bloodGroup: "AB+", hospital: "চট্টগ্রাম জেনারেল হাসপাতাল",  district: "চট্টগ্রাম", units: 1, postedAt: "৩২ মিনিট আগে", contact: "018XXXXXXXX", patientAge: "৫২",  reason: "দুর্ঘটনা",       urgent: true,  responded: 1 },
  { id: 3,  bloodGroup: "B-",  hospital: "সিলেট ওসমানী মেডিকেল",        district: "সিলেট",      units: 3, postedAt: "১ ঘণ্টা আগে",  contact: "019XXXXXXXX", patientAge: "২৮",  reason: "প্রসব",           urgent: true,  responded: 2 },
  { id: 4,  bloodGroup: "A+",  hospital: "রাজশাহী মেডিকেল কলেজ",        district: "রাজশাহী",   units: 2, postedAt: "২ ঘণ্টা আগে",  contact: "015XXXXXXXX", patientAge: "৬৫",  reason: "ক্যান্সার চিকিৎসা", urgent: false, responded: 3 },
  { id: 5,  bloodGroup: "O+",  hospital: "খুলনা মেডিকেল কলেজ",          district: "খুলনা",      units: 1, postedAt: "৩ ঘণ্টা আগে",  contact: "016XXXXXXXX", patientAge: "১৮",  reason: "থ্যালাসেমিয়া",   urgent: false, responded: 1 },
  { id: 6,  bloodGroup: "AB-", hospital: "বরিশাল শের-ই-বাংলা মেডিকেল",  district: "বরিশাল",    units: 2, postedAt: "৪ ঘণ্টা আগে",  contact: "017XXXXXXXX", patientAge: "৪৪",  reason: "কিডনি অপারেশন",  urgent: false, responded: 0 },
];

export const hospitals = [
  "ঢাকা মেডিকেল কলেজ হাসপাতাল",
  "স্যার সলিমুল্লাহ মেডিকেল কলেজ",
  "শহীদ সোহরাওয়ার্দী মেডিকেল কলেজ",
  "বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়",
  "চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল",
  "চট্টগ্রাম জেনারেল হাসপাতাল",
  "সিলেট ওসমানী মেডিকেল কলেজ",
  "রাজশাহী মেডিকেল কলেজ হাসপাতাল",
  "খুলনা মেডিকেল কলেজ হাসপাতাল",
  "বরিশাল শের-ই-বাংলা মেডিকেল কলেজ",
  "ময়মনসিংহ মেডিকেল কলেজ হাসপাতাল",
  "রংপুর মেডিকেল কলেজ হাসপাতাল",
  "অন্যান্য হাসপাতাল",
];

export const reasons = [
  "অস্ত্রোপচার",
  "দুর্ঘটনা / ট্রমা",
  "প্রসব / ডেলিভারি",
  "ক্যান্সার চিকিৎসা",
  "থ্যালাসেমিয়া",
  "কিডনি ডায়ালাইসিস",
  "হৃদরোগ অপারেশন",
  "ডেঙ্গু / রক্তশূন্যতা",
  "অন্যান্য",
];

export const groupColors: Record<string, string> = {
  "A+":  "from-red-500 to-red-700",
  "A-":  "from-red-600 to-red-800",
  "B+":  "from-rose-500 to-rose-700",
  "B-":  "from-rose-600 to-rose-800",
  "AB+": "from-red-700 to-red-900",
  "AB-": "from-red-800 to-red-950",
  "O+":  "from-red-400 to-red-600",
  "O-":  "from-red-500 to-red-700",
};
