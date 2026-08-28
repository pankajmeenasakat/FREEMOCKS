import { Radio } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function LiveTestsPage() {
  return (
    <ComingSoon
      title="Live Tests & Quizzes"
      description="Compete in real-time with thousands of students. Live leaderboards, instant results, and adrenaline-packed timed quizzes — all coming your way."
      icon={Radio}
      accentColor="text-rose-500"
      features={["Real-time leaderboard", "Timed quizzes", "Instant rank", "Prize contests"]}
    />
  );
}
