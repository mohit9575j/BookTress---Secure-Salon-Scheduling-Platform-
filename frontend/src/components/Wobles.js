// "use client";

// import React from "react";
// import { WobbleCard } from "./ui/wobble-card";

// export function WobbleCardDemo() {
//   return (
     
//     <div
        
//       className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
//       <WobbleCard
//         containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
//         className="">
//         <div className="max-w-xs">
//           <h2
//             className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
//             Gippity AI powers the entire universe
//           </h2>
//           <p className="mt-4 text-left  text-base/6 text-neutral-200">
//             With over 100,000 mothly active bot users, Gippity AI is the most
//             popular AI platform for developers.
//           </p>
//         </div>
//         <img
//           src="/linear.webp"
//           width={500}
//           height={500}
//           alt="linear demo image"
//           className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl" />
//       </WobbleCard>
//       <WobbleCard containerClassName="col-span-1 min-h-[300px]">
//         <h2
//           className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
//           No shirt, no shoes, no weapons.
//         </h2>
//         <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
//           If someone yells “stop!”, goes limp, or taps out, the fight is over.
//         </p>
//       </WobbleCard>
//       <WobbleCard
//         containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
//         <div className="max-w-sm">
//           <h2
//             className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
//             Signup for blazing-fast cutting-edge state of the art Gippity AI
//             wrapper today!
//           </h2>
//           <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
//             With over 100,000 mothly active bot users, Gippity AI is the most
//             popular AI platform for developers.
//           </p>
//         </div>
//         <img
//           src="/linear.webp"
//           width={500}
//           height={500}
//           alt="linear demo image"
//           className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl" />
//       </WobbleCard>
//     </div>
//   );
// }






"use client";

import React from "react";
import { WobbleCard } from "./ui/wobble-card";

export function WobbleCardDemo() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-10">
      {/* 🔥 Section Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white-800">
        Book Salon Appointments Easily & Effortlessly
      </h1>

      {/* 🧩 Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 💅 Card 1 */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Discover Top-Rated Salons Near You
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Browse and book appointments with trusted salons, hair stylists,
              and beauty professionals instantly.
            </p>
          </div>
          <img
            src="/linear.webp"
            width={500}
            height={500}
            alt="salon booking image"
            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>

        {/* 💇 Card 2 */}
        <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-purple-800">
          <h2 className="max-w-80 text-left text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Schedule at Your Convenience
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Choose the time that suits you best. Flexible booking options for
            all your beauty needs.
          </p>
        </WobbleCard>

        {/* ✂️ Card 3 */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]"
        >
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg text-left text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Your Beauty, Just a Click Away
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              From haircuts to facials, book your next salon appointment online
              — anytime, anywhere.
            </p>
          </div>
          <img
            src="/linear.webp"
            width={500}
            height={500}
            alt="salon services image"
            className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
      </div>
    </div>
  );
}
