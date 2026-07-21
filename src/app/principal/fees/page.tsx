"use client";

import PremiumFeature from "@/components/PremiumFeature";

export default function Fees() {
  return (
    <PremiumFeature
      title="Fee Management"
      description="The Fee Management module is available in the Professional Edition and is currently under development."
      features={[
        "Fee Collection",
        "Student Payments",
        "Payment History",
        "Fee Reports",
        "Installment Plans",
        "Online Payments",
        "Printable Receipts",
      ]}
    />
  );
}