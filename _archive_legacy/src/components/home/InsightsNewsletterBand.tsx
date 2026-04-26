import { Eyebrow } from "@/components/ui/Eyebrow";
import { NewsletterEmailForm } from "@/components/layout/NewsletterEmailForm";

type InsightsNewsletterBandProps = {
  eyebrow: string;
  headline: string;
  body: string;
  /** Social proof line, e.g. subscriber count — set via copy or NEXT_PUBLIC_NEWSLETTER_SUBSCRIBERS */
  subscriberLine: string;
  microcopy: string;
};

export function InsightsNewsletterBand({ eyebrow, headline, body, subscriberLine, microcopy }: InsightsNewsletterBandProps) {
  return (
    <section
      aria-labelledby="insights-newsletter-heading"
      className="mt-14 rounded-4xl border border-[#F05A28]/22 bg-linear-to-br from-[#F05A28]/12 via-[#0C0C0E] to-[#0C0C0E] px-6 py-10 md:px-10 md:py-12"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="insights-newsletter-heading" className="font-display mt-4 text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {headline}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#F5F4F0]/74">{body}</p>
          <p className="mt-5 font-mono text-sm text-[#0FD9C8]/95">{subscriberLine}</p>
        </div>
        <div className="rounded-3xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/80 p-6 md:p-8">
          <p className="text-sm text-[#F5F4F0]/55">{microcopy}</p>
          <NewsletterEmailForm variant="band" className="mt-5" />
        </div>
      </div>
    </section>
  );
}
