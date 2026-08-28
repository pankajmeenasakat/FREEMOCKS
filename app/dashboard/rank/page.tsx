import { Trophy } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function RankPredictorPage() {
  return (
    <ComingSoon
      title="Rank Predictor"
      description="Enter your mock test score and instantly see your predicted rank, percentile, and cut-off comparison across states — powered by real attempt data."
      icon={Trophy}
      accentColor="text-orange-500"
      features={["AI-powered prediction", "State-wise cut-offs", "Percentile graph", "Historical data"]}
    />
  );
}
