import BloodBankClient from "@/components/blood-bank/BloodBankClient";

export const metadata = {
  title: "ব্লাড ব্যাংক | আমার রক্ত",
  description: "বাংলাদেশের সকল ব্লাড ব্যাংকের তালিকা, রক্তের মজুদ ও যোগাযোগ তথ্য।",
};

export default function BloodBankPage() {
  return <BloodBankClient />;
}
