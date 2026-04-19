import Link from "next/link";

export type ContactAlternative = {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
};

type ContactAlternativePathsProps = {
  alternatives: ContactAlternative[];
};

export function ContactAlternativePaths({ alternatives }: ContactAlternativePathsProps) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {alternatives.map((item) => (
        <article key={item.href} className="surface-card rounded-3xl p-6">
          <h3 className="font-bold text-[#F5F4F0]">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#F5F4F0]/50">{item.description}</p>
          <Link href={item.href} className="mt-4 inline-block text-sm font-medium text-[#F05A28] hover:underline">
            {item.ctaLabel}
          </Link>
        </article>
      ))}
    </div>
  );
}
