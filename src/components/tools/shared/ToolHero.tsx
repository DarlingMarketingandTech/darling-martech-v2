import { Eyebrow } from "@/components/ui/Eyebrow";

interface ToolHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function ToolHero({ eyebrow, title, description }: ToolHeroProps) {
  return (
    <header className="max-w-4xl space-y-5">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-display text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-5xl">
        {title}
      </h1>
      <p className="text-lg leading-8 text-[#F5F4F0]/72">{description}</p>
    </header>
  );
}
