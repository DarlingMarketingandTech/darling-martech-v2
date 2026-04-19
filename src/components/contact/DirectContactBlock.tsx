import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function DirectContactBlock() {
  return (
    <div className="surface-card rounded-[2rem] p-7">
      <Eyebrow accent="teal">Or reach out directly</Eyebrow>
      <div className="mt-5 space-y-4">
        <div>
          <p className="text-sm text-[#F5F4F0]/56">Email</p>
          <Link href={`mailto:${siteConfig.founder.email}`} className="mt-1 block text-lg text-[#F5F4F0]">
            {siteConfig.founder.email}
          </Link>
        </div>
        <div>
          <p className="text-sm text-[#F5F4F0]/56">Location</p>
          <p className="mt-1 text-lg text-[#F5F4F0]">{siteConfig.founder.location}</p>
        </div>
        <div>
          <p className="text-sm text-[#F5F4F0]/56">Prefer to schedule directly?</p>
          <Link href={siteConfig.calComLink} className="mt-1 block text-lg text-[#F05A28]" target="_blank" rel="noreferrer">
            Book a 30-minute diagnostic call →
          </Link>
        </div>
        <div>
          <p className="text-sm text-[#F5F4F0]/56">Response window</p>
          <p className="mt-1 text-base text-[#F5F4F0]/72">
            Same-day replies during business hours. Within one business day on weekends and holidays.
          </p>
        </div>
      </div>
    </div>
  );
}
