// import { HoverEffect } from "./ui/card-hover-effect";

// export function CardHoverEffectDemo() {
//   return (
//     <div className="max-w-5xl mx-auto px-8">
//       <HoverEffect items={projects} />
//     </div>
//   );
// }
// export const projects = [
//   {
//     title: "Stripe",
//     description:
//       "A technology company that builds economic infrastructure for the internet.",
//     link: "https://stripe.com",
//   },
//   {
//     title: "Netflix",
//     description:
//       "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
//     link: "https://netflix.com",
//   },
//   {
//     title: "Google",
//     description:
//       "A multinational technology company that specializes in Internet-related services and products.",
//     link: "https://google.com",
//   },
//   {
//     title: "Meta",
//     description:
//       "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
//     link: "https://meta.com",
//   },
//   {
//     title: "Amazon",
//     description:
//       "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
//     link: "https://amazon.com",
//   },
//   {
//     title: "Microsoft",
//     description:
//       "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
//     link: "https://microsoft.com",
//   },
// ];



import { HoverEffect } from "./ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white ">
          Explore Our Popular Services
        </h2>
        <p className="mt-4 text-white text-base md:text-lg">
          Discover top salon services that you can book instantly — from haircuts to bridal makeup, we offer everything you need to look and feel your best.
        </p>
      </div>
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Haircuts & Styling",
    description:
      "Trendy cuts and professional styling tailored to your look. Book a stylist you trust, right when you need them.",
   },
  {
    title: "Bridal & Party Makeup",
    description:
      "Flawless makeup for weddings, parties, and events by certified professionals. Look stunning on your special day.",
   },
  {
    title: "Facials & Skincare",
    description:
      "Rejuvenate your skin with deep cleansing, hydration, and glow-enhancing treatments.",
   },
  {
    title: "Massage Therapy",
    description:
      "Relieve stress and soothe your body with full-body, head, or back massages from trained experts.",
   },
  {
    title: "Manicure & Pedicure",
    description:
      "Pamper your hands and feet with professional nail care and long-lasting polish.",
   },
  {
    title: "Hair Coloring",
    description:
      "From global hair color to highlights, get the perfect shade done by experienced colorists.",
   },
];
