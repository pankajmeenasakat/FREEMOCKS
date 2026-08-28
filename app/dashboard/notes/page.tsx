import { StickyNote } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function StudyNotesPage() {
  return (
    <ComingSoon
      title="Study Notes"
      description="Crisp, exam-focused notes curated by toppers and experts. Available in Hindi & English with KaTeX math rendering for quantitative topics."
      icon={StickyNote}
      accentColor="text-amber-500"
      features={["Hindi + English", "Topic-wise notes", "KaTeX math", "PDF download"]}
    />
  );
}
