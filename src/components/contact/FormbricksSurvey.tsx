"use client";

/**
 * Optional Formbricks embed. Set `NEXT_PUBLIC_FORMBRICKS_SURVEY_URL` to the hosted survey URL
 * (Formbricks share link or embed URL). When unset, nothing renders.
 */
export function FormbricksSurvey() {
  const url = process.env.NEXT_PUBLIC_FORMBRICKS_SURVEY_URL?.trim();

  if (!url) {
    return null;
  }

  return (
    <section className="surface-card rounded-[2rem] p-7 md:p-8" aria-label="Optional feedback survey">
      <p className="text-sm uppercase tracking-[0.24em] text-[#0FD9C8]">Quick pulse</p>
      <p className="mt-2 text-sm text-[#F5F4F0]/62">
        Optional hosted form — skip if you prefer email or Cal below.
      </p>
      <iframe
        title="Darling MarTech intake survey"
        src={url}
        className="mt-6 h-[min(28rem,70vh)] w-full rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014]"
      />
    </section>
  );
}
