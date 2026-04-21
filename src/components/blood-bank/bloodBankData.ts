import { bloodGroups } from "@/components/find-blood/data";

export type StockLevel = "high" | "medium" | "low" | "critical" | "unavailable";

export type BloodStock = {
  group: string;
  units: number;
  level: StockLevel;
};

export type BloodBank = {
  id: number;
  name: string;
  type: "government" | "private" | "voluntary";
  district: string;
  address: string;
  phone: string;
  phone2?: string;
  email?: string;
  openHours: string;
  emergency: boolean;
  verified: boolean;
  rating: number;
  totalDonations: number;
  stock: BloodStock[];
  facilities: string[];
  lat?: number;
  lng?: number;
};

function makeStock(units: number[]): BloodStock[] {
  return bloodGroups.map((g, i) => {
    const u = units[i];
    const level: StockLevel =
      u === 0 ? "unavailable" : u <= 2 ? "critical" : u <= 5 ? "low" : u <= 15 ? "medium" : "high";
    return { group: g, units: u, level };
  });
}

export const bloodBanks: BloodBank[] = [
  {
    id: 1,
    name: "ঢাকা মেডিকেল কলেজ ব্লাড ব্যাংক",
    type: "government",
    district: "ঢাকা",
    address: "বকশীবাজার, ঢাকা-১০০০",
    phone: "02-55165088",
    phone2: "02-55165089",
    email: "dmch.bloodbank@gov.bd",
    openHours: "২৪ ঘণ্টা",
    emergency: true,
    verified: true,
    rating: 4.5,
    totalDonations: 12450,
    stock: makeStock([18, 6, 22, 3, 8, 1, 30, 4]),
    facilities: ["ক্রস-ম্যাচিং", "কম্পোনেন্ট থেরাপি", "অ্যাফেরেসিস", "থ্যালাসেমিয়া সেবা"],
  },
  {
    id: 2,
    name: "বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়",
    type: "government",
    district: "ঢাকা",
    address: "শাহবাগ, ঢাকা-১০০০",
    phone: "02-55165300",
    openHours: "২৪ ঘণ্টা",
    emergency: true,
    verified: true,
    rating: 4.7,
    totalDonations: 18900,
    stock: makeStock([25, 10, 18, 5, 12, 3, 35, 7]),
    facilities: ["ক্রস-ম্যাচিং", "কম্পোনেন্ট থেরাপি", "অ্যাফেরেসিস", "বোন ম্যারো", "থ্যালাসেমিয়া সেবা"],
  },
  {
    id: 3,
    name: "সন্ধানী জাতীয় চক্ষু ইনস্টিটিউট ব্লাড ব্যাংক",
    type: "voluntary",
    district: "ঢাকা",
    address: "শেরে বাংলা নগর, ঢাকা",
    phone: "02-9140057",
    openHours: "সকাল ৮টা – রাত ১০টা",
    emergency: false,
    verified: true,
    rating: 4.8,
    totalDonations: 9800,
    stock: makeStock([14, 4, 16, 2, 6, 0, 20, 3]),
    facilities: ["ক্রস-ম্যাচিং", "কম্পোনেন্ট থেরাপি", "স্বেচ্ছাসেবী রক্তদান"],
  },
  {
    id: 4,
    name: "চট্টগ্রাম মেডিকেল কলেজ ব্লাড ব্যাংক",
    type: "government",
    district: "চট্টগ্রাম",
    address: "কে বি ফজলুল কাদের রোড, চট্টগ্রাম",
    phone: "031-619100",
    openHours: "২৪ ঘণ্টা",
    emergency: true,
    verified: true,
    rating: 4.3,
    totalDonations: 8750,
    stock: makeStock([12, 3, 15, 1, 7, 2, 22, 5]),
    facilities: ["ক্রস-ম্যাচিং", "কম্পোনেন্ট থেরাপি", "থ্যালাসেমিয়া সেবা"],
  },
  {
    id: 5,
    name: "সিলেট ওসমানী মেডিকেল ব্লাড ব্যাংক",
    type: "government",
    district: "সিলেট",
    address: "মজুমদারী, সিলেট",
    phone: "0821-716476",
    openHours: "২৪ ঘণ্টা",
    emergency: true,
    verified: true,
    rating: 4.2,
    totalDonations: 6200,
    stock: makeStock([8, 2, 10, 0, 4, 1, 15, 2]),
    facilities: ["ক্রস-ম্যাচিং", "কম্পোনেন্ট থেরাপি"],
  },
  {
    id: 6,
    name: "রাজশাহী মেডিকেল কলেজ ব্লাড ব্যাংক",
    type: "government",
    district: "রাজশাহী",
    address: "লক্ষ্মীপুর, রাজশাহী",
    phone: "0721-772150",
    openHours: "২৪ ঘণ্টা",
    emergency: true,
    verified: true,
    rating: 4.1,
    totalDonations: 5400,
    stock: makeStock([10, 1, 12, 2, 5, 0, 18, 3]),
    facilities: ["ক্রস-ম্যাচিং", "কম্পোনেন্ট থেরাপি"],
  },
  {
    id: 7,
    name: "খুলনা মেডিকেল কলেজ ব্লাড ব্যাংক",
    type: "government",
    district: "খুলনা",
    address: "ময়লাপোতা, খুলনা",
    phone: "041-731001",
    openHours: "২৪ ঘণ্টা",
    emergency: true,
    verified: true,
    rating: 4.0,
    totalDonations: 4800,
    stock: makeStock([7, 2, 9, 1, 3, 0, 14, 2]),
    facilities: ["ক্রস-ম্যাচিং", "কম্পোনেন্ট থেরাপি"],
  },
  {
    id: 8,
    name: "বাংলাদেশ রেড ক্রিসেন্ট ব্লাড সেন্টার",
    type: "voluntary",
    district: "ঢাকা",
    address: "মতিঝিল, ঢাকা",
    phone: "02-9559071",
    email: "bdrcs@bdrcs.org",
    openHours: "সকাল ৮টা – রাত ৮টা",
    emergency: false,
    verified: true,
    rating: 4.6,
    totalDonations: 15600,
    stock: makeStock([20, 8, 17, 4, 9, 2, 28, 6]),
    facilities: ["ক্রস-ম্যাচিং", "কম্পোনেন্ট থেরাপি", "অ্যাফেরেসিস", "স্বেচ্ছাসেবী রক্তদান"],
  },
  {
    id: 9,
    name: "ইসলামী ব্যাংক হাসপাতাল ব্লাড ব্যাংক",
    type: "private",
    district: "ঢাকা",
    address: "কাকরাইল, ঢাকা",
    phone: "02-9340025",
    openHours: "সকাল ৮টা – রাত ১০টা",
    emergency: false,
    verified: true,
    rating: 4.4,
    totalDonations: 3200,
    stock: makeStock([9, 3, 11, 2, 5, 1, 16, 3]),
    facilities: ["ক্রস-ম্যাচিং", "কম্পোনেন্ট থেরাপি"],
  },
  {
    id: 10,
    name: "ময়মনসিংহ মেডিকেল কলেজ ব্লাড ব্যাংক",
    type: "government",
    district: "ময়মনসিংহ",
    address: "ময়মনসিংহ মেডিকেল কলেজ রোড",
    phone: "091-65500",
    openHours: "২৪ ঘণ্টা",
    emergency: true,
    verified: true,
    rating: 4.0,
    totalDonations: 4100,
    stock: makeStock([6, 1, 8, 0, 3, 0, 12, 1]),
    facilities: ["ক্রস-ম্যাচিং", "কম্পোনেন্ট থেরাপি"],
  },
  {
    id: 11,
    name: "বরিশাল শের-ই-বাংলা মেডিকেল ব্লাড ব্যাংক",
    type: "government",
    district: "বরিশাল",
    address: "বরিশাল মেডিকেল কলেজ রোড",
    phone: "0431-62581",
    openHours: "২৪ ঘণ্টা",
    emergency: true,
    verified: true,
    rating: 3.9,
    totalDonations: 3600,
    stock: makeStock([5, 1, 7, 0, 2, 0, 10, 1]),
    facilities: ["ক্রস-ম্যাচিং", "কম্পোনেন্ট থেরাপি"],
  },
  {
    id: 12,
    name: "রংপুর মেডিকেল কলেজ ব্লাড ব্যাংক",
    type: "government",
    district: "রংপুর",
    address: "রংপুর মেডিকেল কলেজ রোড",
    phone: "0521-63600",
    openHours: "২৪ ঘণ্টা",
    emergency: true,
    verified: true,
    rating: 4.0,
    totalDonations: 3900,
    stock: makeStock([7, 2, 9, 1, 3, 0, 13, 2]),
    facilities: ["ক্রস-ম্যাচিং", "কম্পোনেন্ট থেরাপি"],
  },
];

export const stockLevelConfig: Record<StockLevel, { label: string; color: string; bg: string; bar: string; dot: string }> = {
  high:        { label: "পর্যাপ্ত",  color: "text-green-600",  bg: "bg-green-50",  bar: "bg-green-500",  dot: "bg-green-500"  },
  medium:      { label: "মাঝারি",    color: "text-yellow-600", bg: "bg-yellow-50", bar: "bg-yellow-500", dot: "bg-yellow-500" },
  low:         { label: "কম",        color: "text-orange-600", bg: "bg-orange-50", bar: "bg-orange-500", dot: "bg-orange-500" },
  critical:    { label: "সংকটজনক",  color: "text-red-600",    bg: "bg-red-50",    bar: "bg-red-500",    dot: "bg-red-500"    },
  unavailable: { label: "নেই",       color: "text-gray-400",   bg: "bg-gray-50",   bar: "bg-gray-300",   dot: "bg-gray-300"   },
};

export const typeConfig: Record<BloodBank["type"], { label: string; color: string; bg: string }> = {
  government: { label: "সরকারি",      color: "text-blue-700",  bg: "bg-blue-50 border-blue-200"  },
  private:    { label: "বেসরকারি",    color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  voluntary:  { label: "স্বেচ্ছাসেবী", color: "text-green-700", bg: "bg-green-50 border-green-200" },
};

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
