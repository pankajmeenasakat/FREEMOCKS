import { Sparkles } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function PassPage() {
  return (
    <ComingSoon
      title="Freemocks Pass"
      description="Unlock unlimited access to 670+ premium test series, live tests, previous year papers, and study notes — all at one unbeatable price."
      icon={Sparkles}
      accentColor="text-yellow-500"
      features={["670+ test series", "All exams covered", "Bilingual content", "Priority support"]}
    />
  );
}
