import EmergencyClient from "@/components/emergency/EmergencyClient";

export const metadata = {
  title: "জরুরি রক্তের অনুরোধ | আমার রক্ত",
  description: "জরুরি রক্তের প্রয়োজনে এখনই অনুরোধ পাঠান। ২৪/৭ সেবা, সারা বাংলাদেশে।",
};

export default function EmergencyPage() {
  return <EmergencyClient />;
}
