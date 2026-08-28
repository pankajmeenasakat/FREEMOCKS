import { HelpCircle } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function FreeQuizzesPage() {
  return (
    <ComingSoon
      title="Free Quizzes"
      description="Quick 10–20 question quizzes on GK, Reasoning, Math, English and more. Perfect for daily practice. No sign-up needed for guest quizzes."
      icon={HelpCircle}
      accentColor="text-emerald-500"
      features={["Daily quizzes", "Topic-wise", "GK & Current Affairs", "Instant feedback"]}
    />
  );
}
