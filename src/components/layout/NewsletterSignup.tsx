import { NewsletterEmailForm } from "@/components/layout/NewsletterEmailForm";

export function NewsletterSignup() {
  return (
    <div className="mt-6 space-y-3">
      <p className="text-xs uppercase tracking-[0.2em] text-[#F5F4F0]/45">Newsletter</p>
      <p className="text-sm text-[#F5F4F0]/55">One martech insight per week. No filler.</p>
      <NewsletterEmailForm />
    </div>
  );
}
