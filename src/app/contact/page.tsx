import { SiteShell } from "@/components/layout/site-shell";
import { contactMeta, contactPageData } from "@/data/contact";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(contactMeta);

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
            {contactPageData.hero.eyebrow}
          </p>
          <h1 className="font-display mt-5 text-4xl font-semibold md:text-6xl">
            {contactPageData.hero.headline}
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-8 text-[#F5F4F0]/75">
            {contactPageData.hero.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="surface-card rounded-[2rem] p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
            Intent selector
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {contactPageData.intents.map((intent) => (
              <article key={intent.label} className="rounded-3xl border border-[#F5F4F0]/10 p-5">
                <h2 className="text-lg font-semibold text-[#F5F4F0]">{intent.label}</h2>
                <p className="mt-2 text-sm leading-6 text-[#F5F4F0]/65">
                  {intent.clarifier}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
