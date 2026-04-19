import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { PageHero } from "@/components/hero/PageHero";

type FounderHeroProps = {
  eyebrow: string;
  headline: string;
  body: string[];
  imageId: string;
};

export function FounderHero({ eyebrow, headline, body, imageId }: FounderHeroProps) {
  return (
    <PageHero
      eyebrow={eyebrow}
      headline={headline}
      body={body}
      splitAside={
        <div className="surface-card hero-mesh overflow-hidden rounded-4xl p-4">
          <CloudinaryImage
            publicId={imageId}
            alt="Jacob Darling, founder of Darling MarTech"
            width={900}
            height={1200}
            priority
            className="h-full min-h-[420px] w-full rounded-3xl object-cover"
          />
        </div>
      }
    />
  );
}
