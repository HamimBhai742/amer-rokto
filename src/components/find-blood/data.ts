export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const districts = [
  "ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল",
  "ময়মনসিংহ", "রংপুর", "কুমিল্লা", "নারায়ণগঞ্জ", "গাজীপুর",
  "টাঙ্গাইল", "ফরিদপুর", "যশোর", "নোয়াখালী", "বগুড়া",
  "দিনাজপুর", "পাবনা", "নেত্রকোনা", "কিশোরগঞ্জ",
];

export const upazilas: Record<string, string[]> = {
  "ঢাকা": ["মিরপুর", "মোহাম্মদপুর", "উত্তরা", "গুলশান", "ধানমন্ডি", "রামপুরা", "বাড্ডা", "যাত্রাবাড়ী"],
  "চট্টগ্রাম": ["পাহাড়তলী", "হালিশহর", "পতেঙ্গা", "বায়েজিদ", "চান্দগাঁও", "কোতোয়ালি"],
  "সিলেট": ["সিলেট সদর", "বিশ্বনাথ", "কোম্পানীগঞ্জ", "গোলাপগঞ্জ"],
  "রাজশাহী": ["রাজশাহী সদর", "বোয়ালিয়া", "মতিহার", "শাহমখদুম"],
  "খুলনা": ["খুলনা সদর", "সোনাডাঙ্গা", "খালিশপুর", "দৌলতপুর"],
};

export type Donor = {
  id: number;
  name: string;
  bloodGroup: string;
  district: string;
  upazila: string;
  lastDonation: string;
  totalDonations: number;
  available: boolean;
  phone: string;
  gender: "পুরুষ" | "মহিলা";
  age: number;
  verified: boolean;
};

export const mockDonors: Donor[] = [
  { id: 1,  name: "মোহাম্মদ রাকিব হাসান",  bloodGroup: "A+",  district: "ঢাকা",       upazila: "মিরপুর",     lastDonation: "৩ মাস আগে",  totalDonations: 12, available: true,  phone: "017XXXXXXXX", gender: "পুরুষ",  age: 28, verified: true  },
  { id: 2,  name: "সুমাইয়া আক্তার",         bloodGroup: "O+",  district: "ঢাকা",       upazila: "উত্তরা",     lastDonation: "৪ মাস আগে",  totalDonations: 7,  available: true,  phone: "018XXXXXXXX", gender: "মহিলা", age: 24, verified: true  },
  { id: 3,  name: "তানভীর আহমেদ",            bloodGroup: "B+",  district: "চট্টগ্রাম", upazila: "হালিশহর",   lastDonation: "২ মাস আগে",  totalDonations: 5,  available: false, phone: "019XXXXXXXX", gender: "পুরুষ",  age: 32, verified: true  },
  { id: 4,  name: "নাজমা বেগম",              bloodGroup: "AB+", district: "সিলেট",      upazila: "সিলেট সদর", lastDonation: "৬ মাস আগে",  totalDonations: 3,  available: true,  phone: "015XXXXXXXX", gender: "মহিলা", age: 27, verified: false },
  { id: 5,  name: "আরিফুল ইসলাম",            bloodGroup: "O-",  district: "রাজশাহী",   upazila: "মতিহার",    lastDonation: "১ মাস আগে",  totalDonations: 18, available: true,  phone: "016XXXXXXXX", gender: "পুরুষ",  age: 35, verified: true  },
  { id: 6,  name: "ফারহানা মিম",             bloodGroup: "A-",  district: "ঢাকা",       upazila: "ধানমন্ডি",  lastDonation: "৫ মাস আগে",  totalDonations: 4,  available: true,  phone: "017XXXXXXXX", gender: "মহিলা", age: 22, verified: true  },
  { id: 7,  name: "সাইফুল হক",               bloodGroup: "B-",  district: "খুলনা",      upazila: "সোনাডাঙ্গা", lastDonation: "৮ মাস আগে", totalDonations: 2,  available: false, phone: "018XXXXXXXX", gender: "পুরুষ",  age: 30, verified: false },
  { id: 8,  name: "রিমা চৌধুরী",             bloodGroup: "AB-", district: "চট্টগ্রাম", upazila: "পাহাড়তলী", lastDonation: "৭ মাস আগে",  totalDonations: 6,  available: true,  phone: "019XXXXXXXX", gender: "মহিলা", age: 26, verified: true  },
  { id: 9,  name: "মাহমুদুল হাসান",          bloodGroup: "A+",  district: "ঢাকা",       upazila: "গুলশান",    lastDonation: "২ মাস আগে",  totalDonations: 9,  available: true,  phone: "015XXXXXXXX", gender: "পুরুষ",  age: 29, verified: true  },
  { id: 10, name: "শারমিন নাহার",             bloodGroup: "O+",  district: "সিলেট",      upazila: "বিশ্বনাথ",  lastDonation: "৩ মাস আগে",  totalDonations: 11, available: true,  phone: "016XXXXXXXX", gender: "মহিলা", age: 31, verified: true  },
  { id: 11, name: "জাহিদ হোসেন",             bloodGroup: "B+",  district: "রাজশাহী",   upazila: "বোয়ালিয়া", lastDonation: "১ মাস আগে",  totalDonations: 15, available: true,  phone: "017XXXXXXXX", gender: "পুরুষ",  age: 25, verified: true  },
  { id: 12, name: "তাসনিম জাহান",            bloodGroup: "AB+", district: "ঢাকা",       upazila: "বাড্ডা",    lastDonation: "৪ মাস আগে",  totalDonations: 8,  available: false, phone: "018XXXXXXXX", gender: "মহিলা", age: 23, verified: true  },
  { id: 13, name: "রফিকুল ইসলাম",            bloodGroup: "O+",  district: "ঢাকা",       upazila: "যাত্রাবাড়ী", lastDonation: "৬ মাস আগে", totalDonations: 20, available: true,  phone: "019XXXXXXXX", gender: "পুরুষ",  age: 40, verified: true  },
  { id: 14, name: "মেহেরুন নেসা",            bloodGroup: "A+",  district: "চট্টগ্রাম", upazila: "কোতোয়ালি", lastDonation: "২ মাস আগে",  totalDonations: 5,  available: true,  phone: "015XXXXXXXX", gender: "মহিলা", age: 28, verified: false },
  { id: 15, name: "শাহরিয়ার কবির",           bloodGroup: "B+",  district: "ঢাকা",       upazila: "রামপুরা",   lastDonation: "৫ মাস আগে",  totalDonations: 3,  available: true,  phone: "016XXXXXXXX", gender: "পুরুষ",  age: 33, verified: true  },
  { id: 16, name: "নুসরাত জাহান",            bloodGroup: "O-",  district: "খুলনা",      upazila: "খালিশপুর",  lastDonation: "৩ মাস আগে",  totalDonations: 7,  available: true,  phone: "017XXXXXXXX", gender: "মহিলা", age: 26, verified: true  },
];
