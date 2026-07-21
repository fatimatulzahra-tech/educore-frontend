"use client";

import PremiumFeature from "@/components/PremiumFeature";

export default function Academics() {
  return (
    <PremiumFeature
      title="Academic Management"
      description="The Academic Management module is available in the Professional Edition and is currently under development."
      features={[
        "Examination Management",
        "Result Generation",
        "Grade Books",
        "Report Cards",
        "Academic Transcripts",
        "Performance Analytics",
        "Promotion & Graduation",
      ]}
    />
  );
}