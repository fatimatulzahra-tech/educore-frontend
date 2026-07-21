"use client";

import PremiumFeature from "@/components/PremiumFeature";

export default function Accountants() {
  return (
    <PremiumFeature
      title="Accountant Management"
      description="The Accountant module is available in the Professional Edition and is currently under development."
      features={[
        "Create Accountant Accounts",
        "Assign Accountants to Schools",
        "Reset Accountant Passwords",
        "Manage Fee Collection",
        "Generate Financial Reports",
        "Track Student Payments",
        "View Revenue Analytics",
      ]}
    />
  );
}