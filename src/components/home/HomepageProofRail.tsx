import Link from "next/link";

const PROOF_RAIL_ITEMS = [
  {
    name: "Graston Technique",
    label: "Growth + Platform",
    href: "/proof/graston-technique",
  },
  {
    name: "Primary Care Indy",
    label: "Website System",
    href: "/proof/primarycare-indy",
  },
  {
    name: "Urgent Care Indy",
    label: "Conversion + UX",
    href: "/proof/urgentcare-indy",
  },
  {
    name: "Hoosier Boy",
    label: "Brand + Web",
    href: "/proof/barbershop-command-center",
  },
  {
    name: "Russell Painting",
    label: "Lead Gen System",
    href: "/proof/russell-painting",
  },
] as const;

export function HomepageProofRail() {
  return (
    <section
      className="border-y border-[#F5F4F0]/10 bg-[#121216] px-4 py-20 md:px-8 md:py-24"
      aria-label="Selected client work"
    >
      <ul className="mx-auto flex max-w-6xl snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
        {PROOF_RAIL_ITEMS.map((item) => (
          <li key={item.href} className="min-w-[min(100%,220px)] shrink-0 snap-start md:min-w-0">
            <Link
              href={item.href}
              className="group block rounded-2xl border border-[#F5F4F0]/8 bg-[#0F0F13] px-4 py-5 transition-[border-color,opacity] duration-200 hover:border-[#F5F4F0]/16 md:px-4 md:py-6"
            >
              <span className="block origin-center transition-transform duration-200 group-hover:scale-[1.02]">
                <span className="font-display block text-base font-semibold tracking-[-0.02em] text-[#F5F4F0]">
                  {item.name}
                </span>
                <span className="mt-2 block text-xs font-medium leading-snug text-[#F5F4F0]/56 group-hover:text-[#F5F4F0]/72">
                  {item.label}
                </span>
                <span className="mt-3 block h-px w-8 bg-[#F05A28]/0 transition-colors duration-200 group-hover:bg-[#F05A28]/80" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
