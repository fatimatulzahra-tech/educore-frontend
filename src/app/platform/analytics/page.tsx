"use client"

import PremiumFeature from "@/components/PremiumFeature"

export default function PlatformAnalytics() {
  return (
    <PremiumFeature
      title="Platform Analytics"
      description="Monitor school growth, active users, revenue, and business insights from one dashboard."
      features={[
        "School growth analytics",
        "User activity reports",
        "Revenue dashboard",
        "Business insights",
      ]}
    />
  )
}