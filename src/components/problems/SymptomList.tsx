type SymptomListProps = {
  symptoms: string[];
  id?: string;
};

export function SymptomList({ symptoms, id }: SymptomListProps) {
  return (
    <div id={id} className="panel-obsidian grain-mask scroll-mt-28 rounded-3xl p-6 sm:rounded-4xl sm:p-7 md:p-8">
      <h2 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] sm:text-2xl">
        Does this sound familiar?
      </h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-[#F5F4F0]/52">
        Quick scan — if two or more show up, you are probably feeling this problem in the business, not just in marketing.
      </p>
      <div className="tech-divider my-5 max-w-md" />
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-4">
        {symptoms.map((symptom) => (
          <li key={symptom} className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#F05A28]" aria-hidden />
            <p className="text-[0.9375rem] leading-7 text-[#F5F4F0]/76">
              {symptom.includes("—") ? (
                <>
                  <span className="font-semibold text-[#F5F4F0]">{symptom.split("—")[0]?.trim()}</span>
                  {" — "}
                  {symptom.split("—").slice(1).join("—").trim()}
                </>
              ) : (
                symptom
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
