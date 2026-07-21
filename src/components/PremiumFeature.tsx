"use client";

interface PremiumFeatureProps {
  title: string;
  description: string;
  features: string[];
}

export default function PremiumFeature({
  title,
  description,
  features,
}: PremiumFeatureProps) {
  return (
    <div className="flex items-center justify-center min-h-[80vh] p-6">
      <div className="w-full max-w-3xl rounded-2xl border bg-white shadow-lg p-10">

        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl">
            🔒
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-3xl font-bold">
          {title}
        </h1>

        {/* Description */}
        <p className="mt-4 text-center text-gray-600">
          {description}
        </p>

        {/* Feature List */}
        <div className="mt-10 rounded-xl bg-gray-50 p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Included Features
          </h2>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3"
              >
                <span className="text-green-600 text-xl">✓</span>

                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="mt-10 flex justify-center">
          <button
            disabled
            className="cursor-not-allowed rounded-lg bg-black px-8 py-3 font-medium text-white opacity-70"
          >
            Coming Soon
          </button>
        </div>

      </div>
    </div>
  );
}