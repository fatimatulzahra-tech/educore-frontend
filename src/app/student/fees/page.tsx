"use client";

import PremiumFeature from "@/components/PremiumFeature";

export default function FeesPage() {
  return (
    <PremiumFeature
      title="Fees Management"
      description="The Fees module is currently under development and will be available in a future update."
      features={[
        "View Fee Structure",
        "Payment History",
        "Download Fee Receipts",
        "Installment Plans",
        "Online Fee Payments",
      ]}
    />
  );
}