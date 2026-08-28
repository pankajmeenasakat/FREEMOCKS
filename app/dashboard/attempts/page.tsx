import { CheckCircle } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function AttemptedTestsPage() {
  return (
    <ComingSoon
      title="Attempted Tests"
      description="Review every test you've taken — detailed question-by-question analysis, time spent, accuracy trends, and improvement suggestions."
      icon={CheckCircle}
      accentColor="text-teal-500"
      features={["Full answer review", "Time analytics", "Accuracy trends", "Weak topic alerts"]}
    />
  );
}
