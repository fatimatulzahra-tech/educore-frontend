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
    <div className="
      flex
      items-center
      justify-center
      min-h-[80vh]
      p-4
      md:p-6
    ">

      <div className="
        w-full
        max-w-3xl
        rounded-2xl
        border
        bg-white
        shadow-lg
        p-6
        md:p-10
      ">


        {/* Lock Icon */}

        <div className="
          flex
          justify-center
          mb-5
          md:mb-6
        ">

          <div className="
            flex
            h-16
            w-16
            md:h-20
            md:w-20
            items-center
            justify-center
            rounded-full
            bg-gray-100
            text-3xl
            md:text-4xl
          ">

            🔒

          </div>

        </div>





        {/* Title */}

        <h1 className="
          text-center
          text-2xl
          md:text-3xl
          font-bold
        ">

          {title}

        </h1>





        {/* Description */}

        <p className="
          mt-4
          text-center
          text-gray-600
          text-sm
          md:text-base
        ">

          {description}

        </p>





        {/* Feature List */}

        <div className="
          mt-8
          md:mt-10
          rounded-xl
          bg-gray-50
          p-4
          md:p-6
        ">


          <h2 className="
            mb-4
            text-lg
            font-semibold
          ">

            Included Features

          </h2>





          <ul className="space-y-3">


            {features.map((feature, index) => (

              <li
                key={index}
                className="
                  flex
                  items-start
                  gap-3
                "
              >

                <span className="
                  text-green-600
                  text-xl
                  shrink-0
                ">
                  ✓
                </span>


                <span className="text-sm md:text-base">
                  {feature}
                </span>


              </li>

            ))}


          </ul>


        </div>





        {/* Button */}

        <div className="
          mt-8
          md:mt-10
          flex
          justify-center
        ">

          <button
            disabled
            className="
              cursor-not-allowed
              rounded-lg
              bg-black
              px-8
              py-3
              font-medium
              text-white
              opacity-70
              w-full
              sm:w-auto
            "
          >

            Coming Soon

          </button>


        </div>


      </div>


    </div>
  );
}