"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

 const content = [
  {
    title: "Haircuts & Styling",
    description:
      "From classic trims to trendy makeovers, get the perfect haircut and style that suits your personality. Book top-rated hairstylists and feel confident every day.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xl font-semibold">
        Haircuts & Styling
      </div>
    ),
  },
  {
    title: "Relaxing Massages",
    description:
      "Unwind with our expert massage sessions. Choose from head, shoulder, or full-body massages that relax your mind and body after a long day.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-500 to-yellow-400 text-white text-xl font-semibold">
        Relaxing Massages
      </div>
      </div>
    ),
  },
  {
    title: "Bridal & Party Makeup",
    description:
      "Get ready for your big day with our professional bridal and party makeup artists. Flawless looks, customized for every skin tone and event style.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xl font-semibold">
        Bridal & Party Makeup
      </div>
    ),
  },
  {
    title: "Facials & Skincare",
    description:
      "Rejuvenate your skin with deep-cleansing facials, detan treatments, and advanced skincare services by experienced beauty experts.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 text-white text-xl font-semibold">
        Facials & Skincare
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
