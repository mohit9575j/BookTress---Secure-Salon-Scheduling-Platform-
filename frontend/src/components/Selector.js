import { PointerHighlight } from "./ui/pointer-highlight";

export function PointerHighlightDemo() {
  return (
    <div
      className="mx-auto max-w-lg py-20 text-2xl font-bold tracking-tight md:text-4xl">Your Salon Experience
            <PointerHighlight>
        <span>Just a Click Away</span>
      </PointerHighlight>
    </div>
  );
}
