import FindBloodClient from "@/components/find-blood/FindBloodClient";

export const metadata = {
  title: "রক্ত খুঁজুন | আমার রক্ত",
  description: "আপনার প্রয়োজনীয় রক্তের গ্রুপ ও জেলা অনুযায়ী স্বেচ্ছাসেবী ডোনার খুঁজুন।",
};

export default function FindBloodPage() {
  return <FindBloodClient />;
}
