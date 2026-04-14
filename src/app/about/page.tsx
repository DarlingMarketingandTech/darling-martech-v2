import { SiteShell } from "@/components/layout/site-shell";
import { aboutMeta, aboutPageData } from "@/data/about";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(aboutMeta);

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
            {aboutPageData.hero.eyebrow}
          </p>
          <h1 className="font-display mt-5 text-4xl font-semibold md:text-6xl">
            {aboutPageData.hero.headline}
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-8 text-[#F5F4F0]/75">
            {aboutPageData.hero.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="surface-card flex min-h-[360px] items-end rounded-[2rem] p-8">
          <p className="text-sm text-[#0FD9C8]">
            Cloudinary portrait placeholder: {aboutPageData.hero.imageId}
          </p>
        </div>
      </section>
      <section className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {aboutPageData.credentials.map((credential) => (
          <article key={credential.label} className="surface-card rounded-3xl p-6">
            <p className="font-mono text-3xl font-bold text-[#22C55E]">{credential.value}</p>
            <p className="mt-2 text-sm leading-6 text-[#F5F4F0]/65">{credential.label}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
