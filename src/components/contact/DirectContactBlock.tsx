import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function DirectContactBlock() {
  return (
    <div className="surface-card rounded-[2rem] p-7">
      <Eyebrow accent="teal">Direct contact</Eyebrow>
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
          <p className="text-sm text-[#F5F4F0]/56">Scheduling</p>
          <Link href={siteConfig.calComLink} className="mt-1 block text-lg text-[#F05A28]" target="_blank" rel="noreferrer">
            Book a diagnostic call
          </Link>
        </div>
      </div>
    </div>
  );
}
