import { FileSpreadsheet } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function PYQPage() {
  return (
    <ComingSoon
      title="Previous Year Papers"
      description="Solve actual exam papers from SSC, Railways, Banking and more. Topic-wise filtered, fully bilingual, with detailed solutions and performance analytics."
      icon={FileSpreadsheet}
      accentColor="text-violet-500"
      features={["SSC CGL 2017–2024", "RRB NTPC papers", "IBPS PO sets", "Detailed solutions"]}
    />
  );
}
